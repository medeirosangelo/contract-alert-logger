import api from './api';
import { toast } from '@/components/ui/use-toast';

export interface Contract {
  id: number;
  contractNumber: string;
  object: string;
  contractorCompanyName: string;
  contractedCompanyName: string;
  totalValue: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'finished';
}

export const contractsApi = {
  getAll: async () => {
    try {
      console.log('Fetching all contracts...');
      const response = await api.get<Contract[]>('/contracts/');
      console.log('Contracts fetched:', response.data);
      return response.data;
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

  getById: async (id: number) => {
    try {
      console.log(`Fetching contract ${id}...`);
      const response = await api.get<Contract>(`/contracts/${id}/`);
      console.log('Contract fetched:', response.data);
      return response.data;
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

  create: async (data: Omit<Contract, 'id'>) => {
    try {
      console.log('Creating contract:', data);
      const response = await api.post<Contract>('/contracts/', data);
      console.log('Contract created:', response.data);
      toast({
        title: "Contrato criado",
        description: "O contrato foi criado com sucesso.",
      });
      return response.data;
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

  update: async (id: number, data: Partial<Contract>) => {
    try {
      console.log(`Updating contract ${id}:`, data);
      const response = await api.patch<Contract>(`/contracts/${id}/`, data);
      console.log('Contract updated:', response.data);
      toast({
        title: "Contrato atualizado",
        description: "O contrato foi atualizado com sucesso.",
      });
      return response.data;
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

  delete: async (id: number) => {
    try {
      console.log(`Deleting contract ${id}...`);
      await api.delete(`/contracts/${id}/`);
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
  }
};