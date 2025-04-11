
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ContractSummaryCards = () => {
  const { data: summaryData, isLoading } = useQuery({
    queryKey: ['contractSummary'],
    queryFn: async () => {
      // Fetch total contracts count
      const { count: totalContracts, error: totalError } = await supabase
        .from('contracts')
        .select('*', { count: 'exact', head: true });

      if (totalError) throw totalError;

      // Fetch active contracts count
      const { count: activeContracts, error: activeError } = await supabase
        .from('contracts')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      if (activeError) throw activeError;

      // Fetch sum of contract values
      const { data: valueData, error: valueError } = await supabase
        .from('contracts')
        .select('total_value');

      if (valueError) throw valueError;

      // Calculate total value
      const totalValue = valueData.reduce((sum, contract) => {
        return sum + (Number(contract.total_value) || 0);
      }, 0);

      // Calculate average value
      const averageValue = activeContracts > 0 ? totalValue / activeContracts : 0;

      return {
        totalContracts: totalContracts || 0,
        activeContracts: activeContracts || 0,
        totalValue,
        averageValue
      };
    }
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? '...' : summaryData?.totalContracts}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? '...' : summaryData?.activeContracts}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? '...' : summaryData?.totalValue?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? '...' : summaryData?.averageValue?.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractSummaryCards;
