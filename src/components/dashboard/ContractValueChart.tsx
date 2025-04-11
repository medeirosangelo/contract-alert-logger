
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { supabase } from "@/integrations/supabase/client";

const ContractValueChart = () => {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['contractProjections'],
    queryFn: async () => {
      // Fetch all active contracts
      const { data: contracts, error } = await supabase
        .from('contracts')
        .select('start_date, end_date, total_value')
        .eq('status', 'active');

      if (error) throw error;

      // Group contract values by year
      const yearlyData = {};
      
      // Current year and next 2 years
      const currentYear = new Date().getFullYear();
      const years = [currentYear, currentYear + 1, currentYear + 2];
      
      // Initialize yearly data
      years.forEach(year => {
        yearlyData[year] = 0;
      });
      
      // Calculate prorated values for each contract per year
      contracts?.forEach(contract => {
        if (!contract.start_date || !contract.end_date || !contract.total_value) return;
        
        const startDate = new Date(contract.start_date);
        const endDate = new Date(contract.end_date);
        const contractValue = Number(contract.total_value);
        
        // Calculate total days of contract
        const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
        if (totalDays <= 0) return;
        
        // Calculate daily value
        const dailyValue = contractValue / totalDays;
        
        // Assign value to each year
        years.forEach(year => {
          const yearStart = new Date(year, 0, 1);
          const yearEnd = new Date(year, 11, 31);
          
          // Skip if contract ends before this year or starts after this year
          if (endDate < yearStart || startDate > yearEnd) return;
          
          // Calculate overlap days
          const overlapStart = startDate > yearStart ? startDate : yearStart;
          const overlapEnd = endDate < yearEnd ? endDate : yearEnd;
          const overlapDays = (overlapEnd.getTime() - overlapStart.getTime()) / (1000 * 60 * 60 * 24) + 1;
          
          // Add prorated value for this year
          yearlyData[year] += dailyValue * overlapDays;
        });
      });
      
      // Convert to array format for chart
      return years.map(year => ({
        year: year.toString(),
        value: Math.round(yearlyData[year]),
        label: `${year}`
      }));
    },
  });

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    });
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
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-warm-200" />
                <XAxis
                  dataKey="label"
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
                  formatter={(value: number) => [formatCurrency(value), 'Valor Previsto']}
                  cursor={{ fill: 'rgba(139, 69, 19, 0.1)' }}
                />
                <Legend />
                <Bar
                  name="Valor Projetado"
                  dataKey="value"
                  fill="#8B4513"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                  background={{ fill: '#eee' }}
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
