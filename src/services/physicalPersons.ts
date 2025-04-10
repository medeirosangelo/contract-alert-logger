
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { PhysicalPerson, PhysicalPersonInsert } from "./types";

export const physicalPersonsApi = {
  getAll: async () => {
    try {
      console.log('Fetching all physical persons...');
      const { data, error } = await supabase
        .from('physical_persons')
        .select('*')
        .order('full_name', { ascending: true });

      if (error) throw error;
      console.log('Physical persons fetched:', data);
      return data as PhysicalPerson[];
    } catch (error) {
      console.error('Error fetching physical persons:', error);
      toast({
        title: "Erro ao carregar pessoas físicas",
        description: "Não foi possível carregar a lista de pessoas físicas.",
        variant: "destructive",
      });
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
      toast({
        title: "Erro ao carregar pessoa física",
        description: "Não foi possível carregar os detalhes da pessoa física.",
        variant: "destructive",
      });
      throw error;
    }
  },

  create: async (data: PhysicalPersonInsert) => {
    try {
      console.log('Creating physical person:', data);
      const { data: newPerson, error } = await supabase
        .from('physical_persons')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      console.log('Physical person created:', newPerson);
      toast({
        title: "Pessoa física cadastrada",
        description: "A pessoa física foi cadastrada com sucesso.",
      });
      return newPerson as PhysicalPerson;
    } catch (error) {
      console.error('Error creating physical person:', error);
      toast({
        title: "Erro ao cadastrar pessoa física",
        description: "Não foi possível cadastrar a pessoa física.",
        variant: "destructive",
      });
      throw error;
    }
  },

  update: async (id: string, data: Partial<PhysicalPerson>) => {
    try {
      console.log(`Updating physical person ${id}:`, data);
      const { data: updatedPerson, error } = await supabase
        .from('physical_persons')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      console.log('Physical person updated:', updatedPerson);
      toast({
        title: "Pessoa física atualizada",
        description: "A pessoa física foi atualizada com sucesso.",
      });
      return updatedPerson as PhysicalPerson;
    } catch (error) {
      console.error(`Error updating physical person ${id}:`, error);
      toast({
        title: "Erro ao atualizar pessoa física",
        description: "Não foi possível atualizar a pessoa física.",
        variant: "destructive",
      });
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

      if (error) throw error;
      console.log(`Physical person ${id} deleted`);
      toast({
        title: "Pessoa física excluída",
        description: "A pessoa física foi excluída com sucesso.",
      });
    } catch (error) {
      console.error(`Error deleting physical person ${id}:`, error);
      toast({
        title: "Erro ao excluir pessoa física",
        description: "Não foi possível excluir a pessoa física.",
        variant: "destructive",
      });
      throw error;
    }
  }
};
