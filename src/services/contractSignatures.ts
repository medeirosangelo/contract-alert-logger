import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface ContractSignature {
  id: string;
  contract_id: string;
  signer_id: string;
  signer_name: string;
  signer_email: string;
  signer_role: string;
  document_hash: string;
  signature_date: string;
  signature_type: 'basic' | 'advanced' | 'qualified';
  ip_address?: string;
  user_agent?: string;
  signature_token: string;
  is_valid: boolean;
  created_at: string;
  updated_at: string;
}

export interface SignDocumentData {
  contract_id: string;
  document_content: string;
  signer_role: string;
}

export const contractSignaturesApi = {
  // Buscar assinaturas de um contrato
  getByContractId: async (contractId: string): Promise<ContractSignature[]> => {
    try {
      console.log(`Buscando assinaturas do contrato ${contractId}...`);
      const { data, error } = await supabase
        .from('contract_signatures')
        .select('*')
        .eq('contract_id', contractId)
        .order('signature_date', { ascending: true });

      if (error) {
        console.error('Erro ao buscar assinaturas:', error);
        throw error;
      }

      console.log('Assinaturas encontradas:', data?.length || 0);
      return data as ContractSignature[];
    } catch (error) {
      console.error('Erro ao buscar assinaturas do contrato:', error);
      toast.error("Não foi possível carregar as assinaturas do contrato.");
      throw error;
    }
  },

  // Assinar documento
  signDocument: async (data: SignDocumentData): Promise<ContractSignature> => {
    try {
      // Obter informações do usuário atual
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // Buscar informações do usuário na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('name, email')
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Erro ao buscar dados do usuário:', userError);
        throw userError;
      }

      // Gerar hash do documento
      const { data: hashResult, error: hashError } = await supabase
        .rpc('generate_document_hash', { content: data.document_content });

      if (hashError) {
        console.error('Erro ao gerar hash:', hashError);
        throw hashError;
      }

      // Gerar token único da assinatura
      const signatureToken = `${user.id}-${data.contract_id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Obter IP do usuário (básico)
      const clientInfo = {
        ip_address: null,
        user_agent: navigator.userAgent
      };

      const signatureData = {
        contract_id: data.contract_id,
        signer_id: user.id,
        signer_name: userData.name || userData.email,
        signer_email: userData.email,
        signer_role: data.signer_role,
        document_hash: hashResult,
        signature_type: 'basic' as const,
        signature_token: signatureToken,
        user_agent: clientInfo.user_agent
      };

      console.log('Criando assinatura digital:', signatureData);
      const { data: newSignature, error } = await supabase
        .from('contract_signatures')
        .insert(signatureData)
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar assinatura:', error);
        throw error;
      }

      console.log('Assinatura criada com sucesso');
      toast.success("Documento assinado digitalmente com sucesso!");
      
      return newSignature as ContractSignature;
    } catch (error) {
      console.error('Erro ao assinar documento:', error);
      toast.error(error instanceof Error ? error.message : "Falha ao assinar documento.");
      throw error;
    }
  },

  // Validar assinatura
  validateSignature: async (contractId: string, signerId: string, documentContent: string): Promise<boolean> => {
    try {
      console.log(`Validando assinatura - Contrato: ${contractId}, Signatário: ${signerId}`);
      
      const { data: isValid, error } = await supabase
        .rpc('validate_signature', {
          p_contract_id: contractId,
          p_signer_id: signerId,
          p_document_content: documentContent
        });

      if (error) {
        console.error('Erro ao validar assinatura:', error);
        throw error;
      }

      console.log('Resultado da validação:', isValid);
      return isValid as boolean;
    } catch (error) {
      console.error('Erro ao validar assinatura:', error);
      toast.error("Não foi possível validar a assinatura.");
      throw error;
    }
  },

  // Invalidar assinatura (admin apenas)
  invalidateSignature: async (signatureId: string): Promise<void> => {
    try {
      console.log(`Invalidando assinatura ${signatureId}...`);
      
      const { error } = await supabase
        .from('contract_signatures')
        .update({ is_valid: false })
        .eq('id', signatureId);

      if (error) {
        console.error('Erro ao invalidar assinatura:', error);
        throw error;
      }

      console.log('Assinatura invalidada com sucesso');
      toast.success("Assinatura invalidada com sucesso!");
    } catch (error) {
      console.error('Erro ao invalidar assinatura:', error);
      toast.error("Não foi possível invalidar a assinatura.");
      throw error;
    }
  }
};