
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const ServicesAnalysis = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['servicesAnalysis'],
    queryFn: async () => {
      try {
        // Buscar contratos relacionados a serviços (poderia ser filtrado por uma categoria específica)
        const { data: contracts, error } = await supabase
          .from('contracts')
          .select('object, total_value, status')
          .eq('status', 'active');

        if (error) throw error;

        // Categorizar serviços baseado na descrição do objeto
        const serviceCategories = {
          "Tecnologia": ["software", "hardware", "ti ", "tecnologia", "sistema", "digital", "computador"],
          "Consultoria": ["consultoria", "assessoria", "aconselhamento"],
          "Manutenção": ["manutenção", "manutencao", "reparo", "conserto"],
          "Limpeza": ["limpeza", "higienização", "conservação"],
          "Segurança": ["segurança", "seguranca", "vigilância", "monitoramento"],
          "Transporte": ["transporte", "logística", "entrega", "frete"],
          "Marketing": ["marketing", "publicidade", "propaganda", "divulgação"],
          "Recursos Humanos": ["rh", "recursos humanos", "treinamento", "capacitação"],
          "Jurídico": ["jurídico", "jurídica", "advogado", "legal"],
          "Financeiro": ["financeiro", "contábil", "contabilidade"]
        };

        // Processar contratos para categorizar serviços
        const serviceData: Record<string, number> = {};

        contracts?.forEach(contract => {
          if (!contract.object || !contract.total_value) return;
          
          const objectLower = contract.object.toLowerCase();
          let foundCategory = false;
          
          for (const [category, keywords] of Object.entries(serviceCategories)) {
            if (keywords.some(keyword => objectLower.includes(keyword))) {
              serviceData[category] = (serviceData[category] || 0) + Number(contract.total_value);
              foundCategory = true;
              break;
            }
          }
          
          if (!foundCategory) {
            serviceData["Outros"] = (serviceData["Outros"] || 0) + Number(contract.total_value);
          }
        });
        
        // Converter para formato de dados para o gráfico
        const chartData = Object.entries(serviceData).map(([name, value]) => ({
          name,
          value
        })).sort((a, b) => b.value - a.value);
        
        return chartData.length > 0 ? chartData : generateMockData();
      } catch (err) {
        console.error("Erro ao buscar análise de serviços:", err);
        return generateMockData();
      }
    }
  });

  const generateMockData = () => {
    return [
      { name: "Tecnologia", value: 250000 },
      { name: "Consultoria", value: 180000 },
      { name: "Manutenção", value: 150000 },
      { name: "Limpeza", value: 120000 },
      { name: "Segurança", value: 100000 },
      { name: "Outros", value: 200000 }
    ];
  };

  // Cores para o gráfico de pizza
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calcular valor total
  const totalValue = data?.reduce((sum, item) => sum + item.value, 0) || 0;

  // Config para o gráfico shadcn/ui
  const config = {
    tecnologia: { label: "Tecnologia", color: "#0088FE" },
    consultoria: { label: "Consultoria", color: "#00C49F" },
    manutencao: { label: "Manutenção", color: "#FFBB28" },
    limpeza: { label: "Limpeza", color: "#FF8042" },
    seguranca: { label: "Segurança", color: "#8884d8" },
    outros: { label: "Outros", color: "#83a6ed" }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 shadow-md border border-warm-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-warm-800">Distribuição de Serviços Contratados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="h-[350px] w-full" />
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-red-500">
                <p>Erro ao carregar dados</p>
              </div>
            ) : (
              <ChartContainer config={config} className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {data?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium leading-none">
                                    {data.name}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    Categoria
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium leading-none">
                                    {formatCurrency(data.value)}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {((data.value / totalValue) * 100).toFixed(1)}%
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md border border-warm-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-warm-800">Sumário de Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">
              <p>Erro ao carregar dados</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Valor Total</h3>
                <p className="text-2xl font-bold text-warm-800">{formatCurrency(totalValue)}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Distribuição</h3>
                <ul className="space-y-2">
                  {data?.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span>{item.name}</span>
                      </div>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesAnalysis;
