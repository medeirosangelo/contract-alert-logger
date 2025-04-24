
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ContractSummaryCards = () => {
  const { data: summaryData, isLoading, error } = useQuery({
    queryKey: ['contractSummary'],
    queryFn: async () => {
      try {
        const today = new Date();
        const thirtyDaysAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        
        const { data: totalData, error: totalError } = await supabase
          .from('contracts')
          .select('id, total_value, status, created_at, end_date');

        if (totalError) {
          console.error("Erro ao buscar resumo de contratos:", totalError);
          throw totalError;
        }

        if (!totalData || totalData.length === 0) {
          return {
            totalContracts: 0,
            activeContracts: 0,
            totalValue: 0,
            averageValue: 0,
            growth: 0,
            currentMonthContracts: 0,
            previousMonthContracts: 0
          };
        }

        const totalContracts = totalData.length;
        const activeContracts = totalData.filter(c => c.status === 'active').length;
        const totalValue = totalData.reduce((sum, contract) => sum + (Number(contract.total_value) || 0), 0);
        const averageValue = activeContracts > 0 ? totalValue / activeContracts : 0;
        
        const currentMonthContracts = totalData.filter(contract => 
          contract.created_at && 
          new Date(contract.created_at) >= thirtyDaysAgo
        );
        const currentMonthValue = currentMonthContracts.reduce(
          (sum, contract) => sum + (Number(contract.total_value) || 0), 0
        );

        const previousMonthContracts = totalData.filter(contract => 
          contract.created_at && 
          new Date(contract.created_at) < thirtyDaysAgo
        );
        const previousMonthValue = previousMonthContracts.reduce(
          (sum, contract) => sum + (Number(contract.total_value) || 0), 0
        );

        let growth = 0;
        if (previousMonthValue > 0) {
          growth = ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;
        }

        return {
          totalContracts,
          activeContracts,
          totalValue,
          averageValue,
          growth,
          currentMonthContracts: currentMonthContracts.length,
          previousMonthContracts: previousMonthContracts.length
        };
      } catch (err) {
        console.error("Erro na função de consulta de resumo:", err);
        return {
          totalContracts: 0,
          activeContracts: 0,
          totalValue: 0,
          averageValue: 0,
          growth: 0,
          currentMonthContracts: 0,
          previousMonthContracts: 0
        };
      }
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
      <Card className="shadow-sm border border-warm-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Total de Contratos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : error ? (
            <div className="text-red-500 text-sm">Erro ao carregar dados</div>
          ) : (
            <div className="text-2xl font-bold text-warm-800">
              {summaryData?.totalContracts || 0}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border border-warm-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Contratos Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : error ? (
            <div className="text-red-500 text-sm">Erro ao carregar dados</div>
          ) : (
            <div className="text-2xl font-bold text-warm-800">
              {summaryData?.activeContracts || 0}
            </div>
          )}
          {!isLoading && !error && summaryData && (
            <p className="text-xs text-warm-500 mt-1">
              {Math.round((summaryData.activeContracts / Math.max(summaryData.totalContracts, 1)) * 100)}% do total
            </p>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border border-warm-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Valor Total</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
          ) : error ? (
            <div className="text-red-500 text-sm">Erro ao carregar dados</div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="text-2xl font-bold text-warm-800">
                {formatCurrency(summaryData?.totalValue || 0)}
              </div>
              {summaryData?.growth !== 0 && (
                <div className={`text-xs flex items-center ${summaryData?.growth && summaryData.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {summaryData?.growth && summaryData.growth > 0 ? (
                    <ArrowUp className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-1" />
                  )}
                  {Math.abs(summaryData?.growth || 0).toFixed(1)}% em relação ao mês anterior
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm border border-warm-200 hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-warm-700">Valor Médio</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : error ? (
            <div className="text-red-500 text-sm">Erro ao carregar dados</div>
          ) : (
            <div className="text-2xl font-bold text-warm-800">
              {formatCurrency(summaryData?.averageValue || 0)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractSummaryCards;
