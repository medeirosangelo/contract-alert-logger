import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

interface ContractTypeAnalysisProps {
  className?: string;
}

const ContractTypeAnalysis = ({ className }: ContractTypeAnalysisProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['contractTypeAnalysis'],
    queryFn: async () => {
      try {
        // Fetch all contracts to analyze by expense nature
        const { data: contracts, error } = await supabase
          .from('contracts')
          .select('expense_nature, total_value, status')
          .not('expense_nature', 'is', null);

        if (error) throw error;

        // Group contracts by expense nature and calculate values
        const typeMap = new Map();
        
        contracts?.forEach(contract => {
          const type = contract.expense_nature || 'Não especificado';
          const value = Number(contract.total_value) || 0;
          const isActive = contract.status === 'active';
          
          if (!typeMap.has(type)) {
            typeMap.set(type, { name: type, active: 0, other: 0, total: 0 });
          }
          
          const entry = typeMap.get(type);
          if (isActive) {
            entry.active += value;
          } else {
            entry.other += value;
          }
          entry.total += value;
        });
        
        // Sort by total value (descending)
        return Array.from(typeMap.values())
          .sort((a, b) => b.total - a.total)
          .slice(0, 5); // Only show top 5 types
      } catch (err) {
        console.error("Erro ao buscar análise por tipo de contrato:", err);
        return [];
      }
    }
  });

  const generateMockData = () => {
    return [
      { name: "Serviços de Tecnologia", active: 350000, other: 120000, total: 470000 },
      { name: "Manutenção", active: 280000, other: 150000, total: 430000 },
      { name: "Consultoria", active: 250000, other: 100000, total: 350000 },
      { name: "Material de Escritório", active: 120000, other: 80000, total: 200000 },
      { name: "Serviços Gerais", active: 90000, other: 60000, total: 150000 }
    ];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className={`shadow-md border border-warm-200 ${className}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-warm-800">Análise por Tipo de Contrato</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Skeleton className="h-[300px] w-full" />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              <p>Erro ao carregar dados</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{
                  top: 15,
                  right: 30,
                  left: 40,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis 
                  type="number" 
                  tickFormatter={formatCurrency}
                  tick={{fill: '#555', fontSize: 12}}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{fill: '#555', fontSize: 12}}
                  width={150}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), '']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '10px',
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="active" 
                  name="Contratos Ativos" 
                  fill="#22c55e" 
                  stackId="a"
                  radius={[0, 4, 4, 0]}
                />
                <Bar 
                  dataKey="other" 
                  name="Outros Contratos" 
                  fill="#94a3b8" 
                  stackId="a"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContractTypeAnalysis;
