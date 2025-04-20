
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUp, ArrowDown } from "lucide-react";

const ContractSummaryCards = () => {
  const { data: summaryData, isLoading } = useQuery({
    queryKey: ['contractSummary'],
    queryFn: async () => {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      
      // Fetch current month's data
      const { data: currentMonthData, error: currentError } = await supabase
        .from('contracts')
        .select('total_value, status')
        .gte('created_at', lastMonth.toISOString());

      if (currentError) throw currentError;

      // Fetch total contracts data
      const { data: totalData, error: totalError } = await supabase
        .from('contracts')
        .select('total_value, status');

      if (totalError) throw totalError;

      const totalContracts = totalData?.length || 0;
      const activeContracts = totalData?.filter(c => c.status === 'active').length || 0;
      const totalValue = totalData?.reduce((sum, contract) => sum + (Number(contract.total_value) || 0), 0) || 0;
      const averageValue = activeContracts > 0 ? totalValue / activeContracts : 0;
      
      // Calculate month-over-month growth
      const currentMonthTotal = currentMonthData?.reduce((sum, contract) => sum + (Number(contract.total_value) || 0), 0) || 0;
      const previousMonthTotal = totalValue - currentMonthTotal;
      const growth = previousMonthTotal ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 : 0;

      return {
        totalContracts,
        activeContracts,
        totalValue,
        averageValue,
        growth
      };
    }
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {isLoading ? '...' : summaryData?.totalContracts}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Contratos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              {isLoading ? '...' : summaryData?.activeContracts}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-bold">
              {isLoading ? '...' : formatCurrency(summaryData?.totalValue || 0)}
            </div>
            {!isLoading && summaryData?.growth !== 0 && (
              <div className={`text-xs flex items-center ${summaryData?.growth && summaryData.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summaryData?.growth && summaryData.growth > 0 ? (
                  <ArrowUp className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(summaryData?.growth || 0).toFixed(1)}% em relação ao mês anterior
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? '...' : formatCurrency(summaryData?.averageValue || 0)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractSummaryCards;
