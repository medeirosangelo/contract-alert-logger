
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { supabase } from "@/integrations/supabase/client";

const ContractValueChart = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['contractProjections'],
    queryFn: async () => {
      const { data: contracts, error } = await supabase
        .from('contracts')
        .select('start_date, end_date, total_value, status')
        .eq('status', 'active');

      if (error) throw error;

      const yearlyData = new Map();
      const currentYear = new Date().getFullYear();
      
      // Initialize next 3 years
      for (let i = 0; i <= 2; i++) {
        yearlyData.set(currentYear + i, { year: currentYear + i, planned: 0, executed: 0 });
      }

      contracts?.forEach(contract => {
        if (!contract.start_date || !contract.end_date || !contract.total_value) return;

        const startDate = new Date(contract.start_date);
        const endDate = new Date(contract.end_date);
        const contractValue = Number(contract.total_value);
        const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const valuePerDay = contractValue / durationInDays;

        for (let year = currentYear; year <= currentYear + 2; year++) {
          const yearStart = new Date(year, 0, 1);
          const yearEnd = new Date(year, 11, 31);

          if (startDate <= yearEnd && endDate >= yearStart) {
            const daysInYear = Math.min(
              Math.ceil((yearEnd.getTime() - Math.max(startDate.getTime(), yearStart.getTime())) / (1000 * 60 * 60 * 24)) + 1,
              Math.ceil((Math.min(endDate.getTime(), yearEnd.getTime()) - yearStart.getTime()) / (1000 * 60 * 60 * 24)) + 1
            );

            const yearData = yearlyData.get(year);
            const yearValue = valuePerDay * daysInYear;
            
            if (yearData) {
              if (year < currentYear || (year === currentYear && new Date() > startDate)) {
                yearData.executed += yearValue;
              } else {
                yearData.planned += yearValue;
              }
            }
          }
        }
      });

      return Array.from(yearlyData.values());
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
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Projeção de Gastos com Contratos</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Carregando dados...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="year"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={formatCurrency}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value)]}
                  labelFormatter={(label) => `Ano: ${label}`}
                />
                <Legend />
                <Bar
                  name="Valor Executado"
                  dataKey="executed"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  name="Valor Previsto"
                  dataKey="planned"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractValueChart;
