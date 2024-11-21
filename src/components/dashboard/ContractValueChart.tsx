import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ContractValueChart = () => {
  const { data: chartData } = useQuery({
    queryKey: ['contractProjections'],
    queryFn: async () => {
      // This will be replaced with actual API call
      return [
        {
          year: '2024',
          value: 5250000,
        },
        {
          year: '2025',
          value: 6125000,
        },
        {
          year: '2026',
          value: 4375000,
        },
      ];
    }
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
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-warm-200" />
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
                formatter={(value: number) => [formatCurrency(value), 'Valor Previsto']}
                cursor={{ fill: 'rgba(139, 69, 19, 0.1)' }}
              />
              <Bar
                dataKey="value"
                fill="#8B4513"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractValueChart;