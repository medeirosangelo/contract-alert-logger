
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
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

      if (error) throw error;
      console.log('Legal persons fetched:', data);
      return data as LegalPerson[];
    } catch (error) {
      console.error('Error fetching legal persons:', error);
      toast({
        title: "Erro ao carregar pessoas jurídicas",
        description: "Não foi possível carregar a lista de pessoas jurídicas.",
        variant: "destructive",
      });
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
      toast({
        title: "Erro ao carregar pessoa jurídica",
        description: "Não foi possível carregar os detalhes da pessoa jurídica.",
        variant: "destructive",
      });
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
      toast({
        title: "Erro ao carregar pessoa jurídica",
        description: "Não foi possível encontrar pelo CNPJ informado.",
        variant: "destructive",
      });
      throw error;
    }
  },

  create: async (data: LegalPersonInsert) => {
    try {
      console.log('Creating legal person:', data);
      const { data: newPerson, error } = await supabase
        .from('legal_persons')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      console.log('Legal person created:', newPerson);
      toast({
        title: "Pessoa jurídica cadastrada",
        description: "A pessoa jurídica foi cadastrada com sucesso.",
      });
      return newPerson as LegalPerson;
    } catch (error) {
      console.error('Error creating legal person:', error);
      toast({
        title: "Erro ao cadastrar pessoa jurídica",
        description: "Não foi possível cadastrar a pessoa jurídica.",
        variant: "destructive",
      });
      throw error;
    }
  },

  update: async (id: string, data: Partial<LegalPerson>) => {
    try {
      console.log(`Updating legal person ${id}:`, data);
      const { data: updatedPerson, error } = await supabase
        .from('legal_persons')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      console.log('Legal person updated:', updatedPerson);
      toast({
        title: "Pessoa jurídica atualizada",
        description: "A pessoa jurídica foi atualizada com sucesso.",
      });
      return updatedPerson as LegalPerson;
    } catch (error) {
      console.error(`Error updating legal person ${id}:`, error);
      toast({
        title: "Erro ao atualizar pessoa jurídica",
        description: "Não foi possível atualizar a pessoa jurídica.",
        variant: "destructive",
      });
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

      if (error) throw error;
      console.log(`Legal person ${id} deleted`);
      toast({
        title: "Pessoa jurídica excluída",
        description: "A pessoa jurídica foi excluída com sucesso.",
      });
    } catch (error) {
      console.error(`Error deleting legal person ${id}:`, error);
      toast({
        title: "Erro ao excluir pessoa jurídica",
        description: "Não foi possível excluir a pessoa jurídica.",
        variant: "destructive",
      });
      throw error;
    }
  }
};
