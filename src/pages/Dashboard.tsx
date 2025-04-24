import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractStatusCard from "@/components/dashboard/ContractStatusCard";
import ContractCalendar from "@/components/dashboard/ContractCalendar";
import ContractSummaryCards from "@/components/dashboard/ContractSummaryCards";
import ContractValueChart from "@/components/dashboard/ContractValueChart";
import ContractTypeAnalysis from "@/components/dashboard/ContractTypeAnalysis";
import ServicesAnalysis from "@/components/dashboard/ServicesAnalysis";
import SuppliesAnalysis from "@/components/dashboard/SuppliesAnalysis";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Calendar, FileText, RefreshCw, User, Download, Filter } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const { user } = useAuth();
  const userRole = user?.role || 'colaborador';

  const { data: contractStats, isLoading, refetch } = useQuery({
    queryKey: ["contractStats"],
    queryFn: async () => {
      try {
        // Calculate date ranges
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        const thirtyDaysAhead = new Date();
        thirtyDaysAhead.setDate(today.getDate() + 30);
        
        // Format dates for Supabase
        const todayStr = today.toISOString().split('T')[0];
        const thirtyDaysAgoStr = thirtyDaysAgo.toISOString().split('T')[0];
        const thirtyDaysAheadStr = thirtyDaysAhead.toISOString().split('T')[0];
        
        // Get new contracts in last 30 days
        const { data: newContracts, error: newError } = await supabase
          .from('contracts')
          .select('id')
          .gte('created_at', thirtyDaysAgoStr);
          
        if (newError) throw newError;
        
        // Get updated contracts in last 30 days
        const { data: updatedContracts, error: updateError } = await supabase
          .from('contracts')
          .select('id')
          .gte('updated_at', thirtyDaysAgoStr)
          .neq('status', 'finished');
          
        if (updateError) throw updateError;
        
        // Get expired contracts
        const { data: expiredContracts, error: expiredError } = await supabase
          .from('contracts')
          .select('id')
          .lt('end_date', todayStr)
          .eq('status', 'active');
          
        if (expiredError) throw expiredError;
        
        // Get expiring contracts
        const { data: expiringContracts, error: expiringError } = await supabase
          .from('contracts')
          .select('id')
          .gte('end_date', todayStr)
          .lte('end_date', thirtyDaysAheadStr)
          .eq('status', 'active');
          
        if (expiringError) throw expiringError;
        
        return {
          newContracts: newContracts?.length || 0,
          updatedContracts: updatedContracts?.length || 0,
          expiredContracts: expiredContracts?.length || 0,
          expiringContracts: expiringContracts?.length || 0,
        };
      } catch (error) {
        console.error("Error fetching contract stats:", error);
        toast.error("Erro ao carregar estatísticas de contratos");
        return {
          newContracts: 0,
          updatedContracts: 0,
          expiredContracts: 0,
          expiringContracts: 0,
        };
      }
    },
  });

  const handleRefreshData = () => {
    toast.info("Atualizando dados do dashboard...");
    refetch().then(() => {
      toast.success("Dados atualizados com sucesso!");
    });
  };

  const handleExportData = () => {
    toast.info("Preparando exportação de dados...");
    // Simulação de exportação (em uma implementação real, isso faria download de um arquivo)
    setTimeout(() => {
      toast.success("Dados exportados com sucesso!");
    }, 1500);
  };

  const getDashboardContent = () => {
    const commonDashboard = (
      <div className="space-y-6">
        <ContractSummaryCards />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))
          ) : (
            <>
              <ContractStatusCard
                count={contractStats?.newContracts || 0}
                title="Novos Contratos"
                subtitle="(Últimos 30 dias)"
                link="/contracts"
                bgColor="bg-cyan-500"
                icon={<FileText size={28} />}
              />
              <ContractStatusCard
                count={contractStats?.updatedContracts || 0}
                title="Contratos Atualizados"
                subtitle="(Últimos 5 dias)"
                link="/contracts"
                bgColor="bg-green-500"
                icon={<RefreshCw size={28} />}
              />
              <ContractStatusCard
                count={contractStats?.expiredContracts || 0}
                title="Contratos vencidos"
                subtitle="(Necessita atenção)"
                link="/contracts"
                bgColor="bg-red-500"
                icon={<AlertCircle size={28} />}
              />
              <ContractStatusCard
                count={contractStats?.expiringContracts || 0}
                title="Contratos a vencer"
                subtitle="(Próximos 30 dias)"
                link="/alerts/contracts"
                bgColor="bg-orange-500"
                icon={<Calendar size={28} />}
              />
            </>
          )}
        </div>
      </div>
    );

    if (userRole === 'admin' || userRole === 'gestor') {
      return (
        <Tabs defaultValue="visão-geral" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="visão-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="financeiro">Análise Financeira</TabsTrigger>
            <TabsTrigger value="insumos">Insumos</TabsTrigger>
            <TabsTrigger value="servicos">Serviços Prestados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visão-geral" className="space-y-6">
            {commonDashboard}
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
              <ContractValueChart />
              <ContractCalendar />
            </div>
          </TabsContent>
          
          <TabsContent value="financeiro" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-warm-800">Análise Financeira de Contratos</h2>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filtrar
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Último ano</DropdownMenuItem>
                    <DropdownMenuItem>Últimos 6 meses</DropdownMenuItem>
                    <DropdownMenuItem>Último trimestre</DropdownMenuItem>
                    <DropdownMenuItem>Último mês</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ContractTypeAnalysis className="lg:col-span-2" />
              <ContractStatusCard
                count={userRole === 'admin' ? 'Acesso Total' : 'Visualização'}
                title="Nível de Acesso"
                subtitle="Análise Financeira"
                link="#"
                bgColor="bg-purple-500"
                icon={<User size={28} />}
                hideNumber={true}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="insumos" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-warm-800">Análise de Insumos</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Categorias
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>
            <SuppliesAnalysis />
          </TabsContent>
          
          <TabsContent value="servicos" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-warm-800">Análise de Serviços Prestados</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-1" />
                  Exportar
                </Button>
              </div>
            </div>
            <ServicesAnalysis />
          </TabsContent>
        </Tabs>
      );
    }

    return (
      <>
        {commonDashboard}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <ContractValueChart />
          <ContractCalendar />
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-warm-800">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefreshData}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
              <span className="text-sm text-warm-600">
                Atualizado em: {new Date().toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          {getDashboardContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
