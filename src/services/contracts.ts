
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Contract, ContractInsert } from "./types";

export const contractsApi = {
  getAll: async () => {
    try {
      console.log('Fetching all contracts...');
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:contractor_id(id, company_name),
          contracted:contracted_id(id, company_name),
          legal_rep:legal_rep_id(id, full_name)
        `)
        .order('contract_number', { ascending: true });

      if (error) throw error;
      console.log('Contracts fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching contracts:', error);
      toast({
        title: "Erro ao carregar contratos",
        description: "Não foi possível carregar a lista de contratos.",
        variant: "destructive",
      });
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      console.log(`Fetching contract ${id}...`);
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:contractor_id(id, company_name, cnpj, phone, email),
          contracted:contracted_id(id, company_name, cnpj, phone, email),
          legal_rep:legal_rep_id(id, full_name, cpf),
          witness1:witness1_id(id, full_name, cpf),
          witness2:witness2_id(id, full_name, cpf)
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      console.log('Contract fetched:', data);
      return data;
    } catch (error) {
      console.error(`Error fetching contract ${id}:`, error);
      toast({
        title: "Erro ao carregar contrato",
        description: "Não foi possível carregar os detalhes do contrato.",
        variant: "destructive",
      });
      throw error;
    }
  },

  create: async (data: ContractInsert) => {
    try {
      console.log('Creating contract:', data);
      const { data: newContract, error } = await supabase
        .from('contracts')
        .insert(data)
        .select(`
          *,
          contractor:contractor_id(id, company_name),
          contracted:contracted_id(id, company_name)
        `)
        .single();

      if (error) throw error;
      console.log('Contract created:', newContract);
      toast({
        title: "Contrato criado",
        description: "O contrato foi criado com sucesso.",
      });
      return newContract;
    } catch (error) {
      console.error('Error creating contract:', error);
      toast({
        title: "Erro ao criar contrato",
        description: "Não foi possível criar o contrato.",
        variant: "destructive",
      });
      throw error;
    }
  },

  update: async (id: string, data: Partial<Contract>) => {
    try {
      console.log(`Updating contract ${id}:`, data);
      const { data: updatedContract, error } = await supabase
        .from('contracts')
        .update(data)
        .eq('id', id)
        .select(`
          *,
          contractor:contractor_id(id, company_name),
          contracted:contracted_id(id, company_name)
        `)
        .single();

      if (error) throw error;
      console.log('Contract updated:', updatedContract);
      toast({
        title: "Contrato atualizado",
        description: "O contrato foi atualizado com sucesso.",
      });
      return updatedContract;
    } catch (error) {
      console.error(`Error updating contract ${id}:`, error);
      toast({
        title: "Erro ao atualizar contrato",
        description: "Não foi possível atualizar o contrato.",
        variant: "destructive",
      });
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      console.log(`Deleting contract ${id}...`);
      const { error } = await supabase
        .from('contracts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      console.log(`Contract ${id} deleted`);
      toast({
        title: "Contrato excluído",
        description: "O contrato foi excluído com sucesso.",
      });
    } catch (error) {
      console.error(`Error deleting contract ${id}:`, error);
      toast({
        title: "Erro ao excluir contrato",
        description: "Não foi possível excluir o contrato.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  getActive: async () => {
    try {
      console.log('Fetching active contracts...');
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:contractor_id(id, company_name),
          contracted:contracted_id(id, company_name)
        `)
        .eq('status', 'active')
        .order('end_date', { ascending: true });

      if (error) throw error;
      console.log('Active contracts fetched:', data);
      return data;
    } catch (error) {
      console.error('Error fetching active contracts:', error);
      toast({
        title: "Erro ao carregar contratos ativos",
        description: "Não foi possível carregar a lista de contratos ativos.",
        variant: "destructive",
      });
      throw error;
    }
  },
  
  getExpiring: async (days: number = 30) => {
    try {
      console.log(`Fetching contracts expiring in ${days} days...`);
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);
      
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:contractor_id(id, company_name),
          contracted:contracted_id(id, company_name)
        `)
        .eq('status', 'active')
        .lte('end_date', futureDate.toISOString().split('T')[0])
        .gte('end_date', today.toISOString().split('T')[0])
        .order('end_date', { ascending: true });

      if (error) throw error;
      console.log('Expiring contracts fetched:', data);
      return data;
    } catch (error) {
      console.error(`Error fetching expiring contracts:`, error);
      toast({
        title: "Erro ao carregar contratos a vencer",
        description: "Não foi possível carregar a lista de contratos a vencer.",
        variant: "destructive",
      });
      throw error;
    }
  }
};
