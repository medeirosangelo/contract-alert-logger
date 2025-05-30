
import { useState } from 'react';
import { searchCep, ViaCepResponse } from '@/services/viaCep';
import { toast } from 'sonner';

export const useViaCep = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchAddress = async (cep: string): Promise<ViaCepResponse | null> => {
    setIsLoading(true);
    try {
      const result = await searchCep(cep);
      
      if (result) {
        toast.success('Endereço encontrado com sucesso!');
        return result;
      } else {
        toast.error('CEP não encontrado. Verifique o número digitado.');
        return null;
      }
    } catch (error) {
      toast.error('Erro ao buscar CEP. Tente novamente.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchAddress,
    isLoading
  };
};
