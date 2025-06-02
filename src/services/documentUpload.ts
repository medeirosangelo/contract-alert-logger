
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface DocumentUpload {
  id: string;
  entity_type: string;
  entity_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  document_type: string | null;
  uploaded_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface UploadDocumentParams {
  file: File;
  entityType: 'physical_person' | 'legal_person' | 'contract';
  entityId: string;
  documentType?: string;
}

export const documentUploadApi = {
  async uploadDocument({ file, entityType, entityId, documentType }: UploadDocumentParams) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      // Validar tipo de arquivo
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png', 
        'image/jpg',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Tipo de arquivo não permitido');
      }

      // Validar tamanho (10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Arquivo muito grande. Máximo 10MB');
      }

      // Criar nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${entityType}/${entityId}/${Date.now()}.${fileExt}`;

      // Upload para o storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Registrar no banco de dados
      const { data, error } = await supabase
        .from('document_uploads')
        .insert({
          entity_type: entityType,
          entity_id: entityId,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
          document_type: documentType || 'other',
          uploaded_by: user.id
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Upload realizado",
        description: "Documento enviado com sucesso!",
      });

      return data;
    } catch (error: any) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: error.message || "Não foi possível enviar o documento",
        variant: "destructive",
      });
      throw error;
    }
  },

  async getDocuments(entityType: string, entityId: string) {
    try {
      const { data, error } = await supabase
        .from('document_uploads')
        .select('*')
        .eq('entity_type', entityType)
        .eq('entity_id', entityId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao buscar documentos:', error);
      return [];
    }
  },

  async deleteDocument(documentId: string) {
    try {
      // Buscar o documento para pegar o file_path
      const { data: document, error: fetchError } = await supabase
        .from('document_uploads')
        .select('file_path')
        .eq('id', documentId)
        .single();

      if (fetchError) throw fetchError;

      // Deletar do storage
      const { error: deleteStorageError } = await supabase.storage
        .from('documents')
        .remove([document.file_path]);

      if (deleteStorageError) throw deleteStorageError;

      // Deletar do banco
      const { error: deleteDbError } = await supabase
        .from('document_uploads')
        .delete()
        .eq('id', documentId);

      if (deleteDbError) throw deleteDbError;

      toast({
        title: "Documento removido",
        description: "Documento deletado com sucesso!",
      });
    } catch (error: any) {
      console.error('Erro ao deletar documento:', error);
      toast({
        title: "Erro ao deletar",
        description: error.message || "Não foi possível deletar o documento",
        variant: "destructive",
      });
      throw error;
    }
  },

  async getDocumentUrl(filePath: string) {
    try {
      const { data } = await supabase.storage
        .from('documents')
        .createSignedUrl(filePath, 3600); // 1 hora

      return data?.signedUrl || null;
    } catch (error) {
      console.error('Erro ao gerar URL do documento:', error);
      return null;
    }
  }
};
