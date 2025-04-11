
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractStatusCard from "@/components/dashboard/ContractStatusCard";
import ContractCalendar from "@/components/dashboard/ContractCalendar";
import ContractSummaryCards from "@/components/dashboard/ContractSummaryCards";
import ContractValueChart from "@/components/dashboard/ContractValueChart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { data: contractStats, isLoading } = useQuery({
    queryKey: ["contractStats"],
    queryFn: async () => {
      // Calculate date ranges
      const today = new Date();
      const fiveDaysAgo = new Date();
      fiveDaysAgo.setDate(today.getDate() - 5);
      
      const thirtyDaysAhead = new Date();
      thirtyDaysAhead.setDate(today.getDate() + 30);
      
      // Format dates for Supabase
      const todayStr = today.toISOString().split('T')[0];
      const fiveDaysAgoStr = fiveDaysAgo.toISOString().split('T')[0];
      const thirtyDaysAheadStr = thirtyDaysAhead.toISOString().split('T')[0];
      
      // Get new contracts in last 5 days
      const { data: newContracts, error: newError } = await supabase
        .from('contracts')
        .select('id')
        .gte('created_at', fiveDaysAgoStr)
        .lte('created_at', todayStr);
        
      if (newError) throw newError;
      
      // Get updated contracts in last 5 days
      const { data: updatedContracts, error: updateError } = await supabase
        .from('contracts')
        .select('id')
        .gte('updated_at', fiveDaysAgoStr)
        .lte('updated_at', todayStr)
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
    },
  });

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-warm-800">Dashboard</h1>
            <span className="text-sm text-warm-600">
              Atualizado em: {new Date().toLocaleString()}
            </span>
          </div>

          <ContractSummaryCards />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContractStatusCard
              count={isLoading ? 0 : contractStats?.newContracts || 0}
              title="Novos Contratos"
              subtitle="(Últimos 5 dias)"
              link="/contracts"
              bgColor="bg-cyan-500"
            />
            <ContractStatusCard
              count={isLoading ? 0 : contractStats?.updatedContracts || 0}
              title="Contratos Atualizados"
              subtitle="(Últimos 5 dias)"
              link="/contracts"
              bgColor="bg-green-500"
            />
            <ContractStatusCard
              count={isLoading ? 0 : contractStats?.expiredContracts || 0}
              title="Contratos vencidos"
              subtitle="(Últimos 5 dias)"
              link="/contracts"
              bgColor="bg-red-500"
            />
            <ContractStatusCard
              count={isLoading ? 0 : contractStats?.expiringContracts || 0}
              title="Contratos a vencer"
              subtitle="(Próximos 30 dias)"
              link="/alerts/contracts"
              bgColor="bg-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContractValueChart />
            <ContractCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
