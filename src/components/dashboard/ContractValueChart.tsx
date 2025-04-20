
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
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
        const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) || 1;
        const valuePerDay = contractValue / durationInDays;

        for (let year = currentYear; year <= currentYear + 2; year++) {
          const yearStart = new Date(year, 0, 1);
          const yearEnd = new Date(year, 11, 31);

          if (startDate <= yearEnd && endDate >= yearStart) {
            // Calculate days in this specific year for this contract
            const daysInYear = Math.min(
              Math.max(0, Math.ceil((yearEnd.getTime() - Math.max(startDate.getTime(), yearStart.getTime())) / (1000 * 60 * 60 * 24)) + 1),
              Math.max(0, Math.ceil((Math.min(endDate.getTime(), yearEnd.getTime()) - yearStart.getTime()) / (1000 * 60 * 60 * 24)) + 1)
            );

            const yearData = yearlyData.get(year);
            const yearValue = valuePerDay * daysInYear;
            
            if (yearData) {
              const today = new Date();
              // For current year, split between executed and planned based on current date
              if (year === currentYear) {
                const daysExecuted = Math.max(0, Math.min(
                  daysInYear, 
                  Math.ceil((today.getTime() - Math.max(startDate.getTime(), yearStart.getTime())) / (1000 * 60 * 60 * 24)) + 1
                ));
                const executedValue = valuePerDay * daysExecuted;
                const plannedValue = yearValue - executedValue;
                
                yearData.executed += executedValue;
                yearData.planned += plannedValue;
              } 
              // For future years, everything is planned
              else if (year > currentYear) {
                yearData.planned += yearValue;
              } 
              // For past years (shouldn't happen with active contracts but just in case)
              else {
                yearData.executed += yearValue;
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
    <Card className="col-span-2 lg:col-span-4 shadow-md border border-warm-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-warm-800">Projeção de Gastos com Contratos</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[350px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p>Carregando dados...</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={chartData} 
                barGap={8}
                barSize={40}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="year"
                  tick={{fill: '#555', fontSize: 14}}
                  tickLine={false}
                  axisLine={{stroke: '#e0e0e0'}}
                />
                <YAxis
                  width={80}
                  tick={{fill: '#555', fontSize: 12}}
                  tickLine={false}
                  axisLine={{stroke: '#e0e0e0'}}
                  tickFormatter={formatCurrency}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  formatter={(value: number) => [formatCurrency(value), '']}
                  labelFormatter={(label) => `Ano: ${label}`}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{
                    paddingTop: '10px',
                    fontSize: '14px'
                  }}
                />
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
