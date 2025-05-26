
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { PhysicalPerson, PhysicalPersonInsert } from "./types";

export type { PhysicalPerson, PhysicalPersonInsert };

export const physicalPersonsApi = {
  getAll: async () => {
    try {
      console.log('Fetching all physical persons...');
      const { data, error } = await supabase
        .from('physical_persons')
        .select('*')
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Erro específico do Supabase:', error);
        throw new Error(`Erro ao buscar pessoas físicas: ${error.message}`);
      }
      
      console.log('Physical persons fetched:', data);
      return data as PhysicalPerson[];
    } catch (error) {
      console.error('Error fetching physical persons:', error);
      toast.error("Não foi possível carregar a lista de pessoas físicas.");
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      console.log(`Fetching physical person ${id}...`);
      const { data, error } = await supabase
        .from('physical_persons')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      console.log('Physical person fetched:', data);
      return data as PhysicalPerson;
    } catch (error) {
      console.error(`Error fetching physical person ${id}:`, error);
      toast.error("Não foi possível carregar os detalhes da pessoa física.");
      throw error;
    }
  },

  getByCPF: async (cpf: string) => {
    try {
      console.log(`Fetching physical person by CPF ${cpf}...`);
      const { data, error } = await supabase
        .from('physical_persons')
        .select('*')
        .eq('cpf', cpf)
        .maybeSingle();

      if (error) throw error;
      console.log('Physical person fetched by CPF:', data);
      return data as PhysicalPerson | null;
    } catch (error) {
      console.error(`Error fetching physical person by CPF ${cpf}:`, error);
      toast.error("Não foi possível encontrar pelo CPF informado.");
      throw error;
    }
  },

  create: async (data: PhysicalPersonInsert) => {
    try {
      const insertData = { ...data };
      
      console.log('Creating physical person:', insertData);
      const { data: newPerson, error } = await supabase
        .from('physical_persons')
        .insert(insertData);

      if (error) {
        console.error('Erro específico do Supabase ao criar:', error);
        throw new Error(`Falha ao cadastrar pessoa física: ${error.message}`);
      }
      
      console.log('Physical person created successfully');
      toast.success("Pessoa física cadastrada com sucesso!");
      
      return { id: 'temp-id', ...data } as unknown as PhysicalPerson;
    } catch (error) {
      console.error('Error creating physical person:', error);
      toast.error(error instanceof Error ? error.message : "Falha ao cadastrar pessoa física.");
      throw error;
    }
  },

  update: async (id: string, data: Partial<PhysicalPerson>) => {
    try {
      console.log(`Updating physical person ${id}:`, data);
      const { data: updatedPerson, error } = await supabase
        .from('physical_persons')
        .update(data)
        .eq('id', id);

      if (error) {
        console.error('Erro específico do Supabase ao atualizar:', error);
        throw new Error(`Falha ao atualizar pessoa física: ${error.message}`);
      }
      
      console.log('Physical person updated successfully');
      toast.success("Pessoa física atualizada com sucesso!");
      
      return { id, ...data } as PhysicalPerson;
    } catch (error) {
      console.error(`Error updating physical person ${id}:`, error);
      toast.error(error instanceof Error ? error.message : "Falha ao atualizar pessoa física.");
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      console.log(`Deleting physical person ${id}...`);
      const { error } = await supabase
        .from('physical_persons')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro específico do Supabase ao excluir:', error);
        throw new Error(`Falha ao excluir pessoa física: ${error.message}`);
      }
      
      console.log(`Physical person ${id} deleted successfully`);
      toast.success("Pessoa física excluída com sucesso!");
    } catch (error) {
      console.error(`Error deleting physical person ${id}:`, error);
      toast.error(error instanceof Error ? error.message : "Falha ao excluir pessoa física.");
      throw error;
    }
  }
};
