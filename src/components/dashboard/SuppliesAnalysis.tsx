
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

const SuppliesAnalysis = () => {
  const { data: trendsData, isLoading: trendsLoading, error: trendsError } = useQuery({
    queryKey: ['suppliesTrends'],
    queryFn: async () => {
      try {
        // Em um sistema real, poderíamos buscar informações de compra de insumos ao longo do tempo
        // Como não temos essa tabela específica, vamos gerar dados de tendência
        // Em uma implementação real, seria algo como:
        // const { data, error } = await supabase
        //   .from('supplies_purchases')
        //   .select('*')
        //   .order('purchase_date', { ascending: true });
        
        // Gerar dados para os últimos 12 meses
        return generateTrendsData();
      } catch (err) {
        console.error("Erro ao buscar tendências de insumos:", err);
        return generateTrendsData();
      }
    }
  });

  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['suppliesCategories'],
    queryFn: async () => {
      try {
        // Em um sistema real, buscaríamos categorias de insumos e seus valores
        // Por enquanto vamos gerar dados mockados
        return generateCategoriesData();
      } catch (err) {
        console.error("Erro ao buscar categorias de insumos:", err);
        return generateCategoriesData();
      }
    }
  });

  const generateTrendsData = () => {
    const months = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    // Determinar mês atual e gerar dados para os últimos 12 meses
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const data = [];
    
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonthIndex - i + 12) % 12;
      const isPast = i > 0;
      
      // Gerar valores realistas com uma tendência de crescimento
      const baseValue = 50000 + (Math.random() * 30000);
      const growthFactor = 1 + (i * 0.02); // 2% de crescimento por mês
      
      data.push({
        name: months[monthIndex],
        materiais: Math.round(baseValue * growthFactor * (0.8 + Math.random() * 0.4)),
        equipamentos: Math.round((baseValue * 0.7) * growthFactor * (0.85 + Math.random() * 0.3)),
        month: monthIndex,
        isPast
      });
    }
    
    return data.sort((a, b) => a.month - b.month);
  };

  const generateCategoriesData = () => {
    return [
      { name: 'Material de Escritório', value: 120000 },
      { name: 'Equipamentos de TI', value: 350000 },
      { name: 'Mobiliário', value: 85000 },
      { name: 'Material de Limpeza', value: 45000 },
      { name: 'Materiais de Manutenção', value: 95000 }
    ];
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calcular valor total de insumos por categoria
  const totalCategoriesValue = categoriesData?.reduce((sum, item) => sum + item.value, 0) || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-3 shadow-md border border-warm-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-warm-800">Tendência de Gastos com Insumos (Últimos 12 meses)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            {trendsLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="h-[300px] w-full" />
              </div>
            ) : trendsError ? (
              <div className="flex items-center justify-center h-full text-red-500">
                <p>Erro ao carregar dados</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendsData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    tick={{fill: '#555', fontSize: 12}}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    tick={{fill: '#555', fontSize: 12}}
                    width={80}
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
                  <Area 
                    type="monotone" 
                    dataKey="materiais" 
                    name="Materiais" 
                    stackId="1"
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="equipamentos" 
                    name="Equipamentos" 
                    stackId="1"
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-md border border-warm-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-warm-800">Distribuição por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            {categoriesLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Skeleton className="h-[250px] w-full" />
              </div>
            ) : categoriesError ? (
              <div className="flex items-center justify-center h-full text-red-500">
                <p>Erro ao carregar dados</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoriesData}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
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
                  <Bar 
                    dataKey="value" 
                    name="Valor Total" 
                    fill="#3b82f6"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-md border border-warm-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-warm-800">Sumário de Insumos</CardTitle>
        </CardHeader>
        <CardContent>
          {categoriesLoading ? (
            <div className="space-y-4">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : categoriesError ? (
            <div className="text-red-500">
              <p>Erro ao carregar dados</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Valor Total de Insumos</h3>
                <p className="text-2xl font-bold text-warm-800">{formatCurrency(totalCategoriesValue)}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Top Categorias</h3>
                <ul className="space-y-2">
                  {categoriesData?.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 border-t border-warm-200">
                <p className="text-sm text-warm-600">
                  * Os dados de insumos são baseados nos últimos 12 meses de operação
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Componente auxiliar para o gráfico de barras
const BarChart = ({ 
  data, 
  layout = "vertical", 
  ...props 
}: any) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {layout === "vertical" ? (
        <recharts.BarChart
          layout="vertical"
          data={data}
          {...props}
        >
          {props.children}
        </recharts.BarChart>
      ) : (
        <recharts.BarChart
          data={data}
          {...props}
        >
          {props.children}
        </recharts.BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default SuppliesAnalysis;
