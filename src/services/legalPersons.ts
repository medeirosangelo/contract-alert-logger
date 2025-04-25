
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { LegalPerson, LegalPersonInsert } from "./types";

export type { LegalPerson, LegalPersonInsert };

export const legalPersonsApi = {
  getAll: async () => {
    try {
      console.log('Fetching all legal persons...');
      const { data, error } = await supabase
        .from('legal_persons')
        .select('*')
        .order('company_name', { ascending: true });

      if (error) {
        console.error('Erro específico do Supabase:', error);
        throw new Error(`Erro ao buscar pessoas jurídicas: ${error.message}`);
      }
      
      console.log('Legal persons fetched:', data);
      return data as LegalPerson[];
    } catch (error) {
      console.error('Error fetching legal persons:', error);
      toast.error("Não foi possível carregar a lista de pessoas jurídicas.");
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      console.log(`Fetching legal person ${id}...`);
      const { data, error } = await supabase
        .from('legal_persons')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      console.log('Legal person fetched:', data);
      return data as LegalPerson;
    } catch (error) {
      console.error(`Error fetching legal person ${id}:`, error);
      toast.error("Não foi possível carregar os detalhes da pessoa jurídica.");
      throw error;
    }
  },

  getByCNPJ: async (cnpj: string) => {
    try {
      console.log(`Fetching legal person by CNPJ ${cnpj}...`);
      const { data, error } = await supabase
        .from('legal_persons')
        .select('*')
        .eq('cnpj', cnpj)
        .maybeSingle();

      if (error) throw error;
      console.log('Legal person fetched by CNPJ:', data);
      return data as LegalPerson | null;
    } catch (error) {
      console.error(`Error fetching legal person by CNPJ ${cnpj}:`, error);
      toast.error("Não foi possível encontrar pelo CNPJ informado.");
      throw error;
    }
  },

  create: async (data: LegalPersonInsert) => {
    try {
      // Remover o campo created_by para evitar problemas de política RLS
      // Se tivermos autenticação implementada, podemos adicionar isso de volta
      const insertData = { ...data };
      
      console.log('Creating legal person:', insertData);
      const { data: newPerson, error } = await supabase
        .from('legal_persons')
        .insert(insertData);
      
      if (error) {
        console.error('Erro específico do Supabase ao criar:', error);
        throw new Error(`Falha ao cadastrar pessoa jurídica: ${error.message}`);
      }
      
      console.log('Legal person created successfully');
      toast.success("Pessoa jurídica cadastrada com sucesso!");
      
      // Retornar um objeto básico já que não temos o retorno do insert
      return { id: 'temp-id', ...data } as unknown as LegalPerson;
    } catch (error) {
      console.error('Error creating legal person:', error);
      toast.error(error instanceof Error ? error.message : "Falha ao cadastrar pessoa jurídica.");
      throw error;
    }
  },

  update: async (id: string, data: Partial<LegalPerson>) => {
    try {
      console.log(`Updating legal person ${id}:`, data);
      const { data: updatedPerson, error } = await supabase
        .from('legal_persons')
        .update(data)
        .eq('id', id);

      if (error) {
        console.error('Erro específico do Supabase ao atualizar:', error);
        throw new Error(`Falha ao atualizar pessoa jurídica: ${error.message}`);
      }
      
      console.log('Legal person updated successfully');
      toast.success("Pessoa jurídica atualizada com sucesso!");
      
      // Retornar um objeto combinado já que não temos o retorno do update
      return { id, ...data } as LegalPerson;
    } catch (error) {
      console.error(`Error updating legal person ${id}:`, error);
      toast.error(error instanceof Error ? error.message : "Falha ao atualizar pessoa jurídica.");
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      console.log(`Deleting legal person ${id}...`);
      const { error } = await supabase
        .from('legal_persons')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro específico do Supabase ao excluir:', error);
        throw new Error(`Falha ao excluir pessoa jurídica: ${error.message}`);
      }
      
      console.log(`Legal person ${id} deleted successfully`);
      toast.success("Pessoa jurídica excluída com sucesso!");
    } catch (error) {
      console.error(`Error deleting legal person ${id}:`, error);
      toast.error(error instanceof Error ? error.message : "Falha ao excluir pessoa jurídica.");
      throw error;
    }
  }
};
