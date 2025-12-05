
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { ContractAlert, ContractAlertInsert } from "./types";

export const contractAlertsApi = {
  getAll: async () => {
    try {
      console.log('Fetching all contract alerts...');
      const { data, error } = await supabase
        .from('contract_alerts')
        .select(`
          *,
          contract:contract_id(
            id, 
            contract_number, 
            object, 
            end_date, 
            start_date,
            status, 
            total_value, 
            duration,
            signature_date,
            publication_date,
            bank,
            agency,
            account,
            payment_term,
            budget_unit,
            work_program,
            expense_nature,
            resource_source,
            delay_penalty,
            termination_penalty,
            signature_location,
            general_observations,
            contractor:contractor_id(id, company_name, cnpj),
            contracted:contracted_id(id, company_name, cnpj)
          )
        `)
        .order('alert_date', { ascending: true });

      if (error) throw error;
      console.log('Contract alerts fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching contract alerts:', error);
      toast({
        title: "Erro ao carregar alertas",
        description: "Não foi possível carregar a lista de alertas.",
        variant: "destructive",
      });
      throw error;
    }
  },

  getPending: async () => {
    try {
      console.log('Fetching pending contract alerts...');
      const { data, error } = await supabase
        .from('contract_alerts')
        .select(`
          *,
          contract:contract_id(
            id, 
            contract_number, 
            object, 
            end_date, 
            start_date,
            status, 
            total_value, 
            duration,
            signature_date,
            contractor:contractor_id(id, company_name, cnpj),
            contracted:contracted_id(id, company_name, cnpj)
          )
        `)
        .eq('status', 'pending')
        .order('alert_date', { ascending: true });

      if (error) throw error;
      console.log('Pending contract alerts fetched:', data);
      return data || [];
    } catch (error) {
      console.error('Error fetching pending contract alerts:', error);
      toast({
        title: "Erro ao carregar alertas pendentes",
        description: "Não foi possível carregar a lista de alertas pendentes.",
        variant: "destructive",
      });
      return [];
    }
  },

  getByContractId: async (contractId: string) => {
    try {
      console.log(`Fetching alerts for contract ${contractId}...`);
      const { data, error } = await supabase
        .from('contract_alerts')
        .select('*')
        .eq('contract_id', contractId)
        .order('alert_date', { ascending: true });

      if (error) throw error;
      console.log('Contract alerts fetched:', data);
      return data;
    } catch (error) {
      console.error(`Error fetching alerts for contract ${contractId}:`, error);
      toast({
        title: "Erro ao carregar alertas",
        description: "Não foi possível carregar a lista de alertas para este contrato.",
        variant: "destructive",
      });
      throw error;
    }
  },

  create: async (data: ContractAlertInsert) => {
    try {
      console.log('Creating contract alert:', data);
      const { data: newAlert, error } = await supabase
        .from('contract_alerts')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      console.log('Contract alert created:', newAlert);
      toast({
        title: "Alerta criado",
        description: "O alerta de contrato foi criado com sucesso.",
      });
      return newAlert as ContractAlert;
    } catch (error) {
      console.error('Error creating contract alert:', error);
      toast({
        title: "Erro ao criar alerta",
        description: "Não foi possível criar o alerta de contrato.",
        variant: "destructive",
      });
      throw error;
    }
  },

  update: async (id: string, data: Partial<ContractAlert>) => {
    try {
      console.log(`Updating contract alert ${id}:`, data);
      const { data: updatedAlert, error } = await supabase
        .from('contract_alerts')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      console.log('Contract alert updated:', updatedAlert);
      toast({
        title: "Alerta atualizado",
        description: "O alerta de contrato foi atualizado com sucesso.",
      });
      return updatedAlert as ContractAlert;
    } catch (error) {
      console.error(`Error updating contract alert ${id}:`, error);
      toast({
        title: "Erro ao atualizar alerta",
        description: "Não foi possível atualizar o alerta de contrato.",
        variant: "destructive",
      });
      throw error;
    }
  },

  markAsResolved: async (id: string) => {
    try {
      console.log(`Marking contract alert ${id} as resolved...`);
      const { data, error } = await supabase
        .from('contract_alerts')
        .update({ status: 'resolved' })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      console.log('Contract alert marked as resolved:', data);
      toast({
        title: "Alerta resolvido",
        description: "O alerta de contrato foi marcado como resolvido.",
      });
      return data as ContractAlert;
    } catch (error) {
      console.error(`Error marking contract alert ${id} as resolved:`, error);
      toast({
        title: "Erro ao resolver alerta",
        description: "Não foi possível marcar o alerta como resolvido.",
        variant: "destructive",
      });
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      console.log(`Deleting contract alert ${id}...`);
      const { error } = await supabase
        .from('contract_alerts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log(`Contract alert ${id} deleted`);
      toast({
        title: "Alerta excluído",
        description: "O alerta de contrato foi excluído com sucesso.",
      });
    } catch (error) {
      console.error(`Error deleting contract alert ${id}:`, error);
      toast({
        title: "Erro ao excluir alerta",
        description: "Não foi possível excluir o alerta de contrato.",
        variant: "destructive",
      });
      throw error;
    }
  }
};
