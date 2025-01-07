import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractStatusCard from "@/components/dashboard/ContractStatusCard";
import ContractCalendar from "@/components/dashboard/ContractCalendar";
import { useQuery } from "@tanstack/react-query";

console.log("Index component loading...");

const Index = () => {
  console.log("Index component rendering...");

  const { data: contractStats, isLoading, error } = useQuery({
    queryKey: ["contractStats"],
    queryFn: async () => {
      console.log("Fetching contract stats...");
      // Mock data - replace with actual API call
      return {
        newContracts: 0,
        updatedContracts: 3,
        expiredContracts: 0,
        expiringContracts: 2,
      };
    },
  });

  console.log("Contract stats:", contractStats);

  if (isLoading) {
    console.log("Loading contract stats...");
    return <div className="min-h-screen bg-warm-100 flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    console.error("Error loading contract stats:", error);
    return <div className="min-h-screen bg-warm-100 flex items-center justify-center">Error loading data</div>;
  }

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-warm-800">Início</h1>
            <span className="text-sm text-warm-600">
              Atualizado em: {new Date().toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ContractStatusCard
              count={contractStats?.newContracts || 0}
              title="Novos Contratos"
              subtitle="(Últimos 5 dias)"
              link="/contratos"
              bgColor="bg-cyan-500"
            />
            <ContractStatusCard
              count={contractStats?.updatedContracts || 0}
              title="Contratos Atualizados"
              subtitle="(Últimos 5 dias)"
              link="/contratos"
              bgColor="bg-green-500"
            />
            <ContractStatusCard
              count={contractStats?.expiredContracts || 0}
              title="Contratos vencidos"
              subtitle="(Últimos 5 dias)"
              link="/contratos/finalizados"
              bgColor="bg-red-500"
            />
            <ContractStatusCard
              count={contractStats?.expiringContracts || 0}
              title="Contratos a vencer"
              subtitle="(Últimos 5 dias)"
              link="/alertas/contratos"
              bgColor="bg-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Contratos por Categoria</h2>
              {/* Add your chart component here */}
            </div>
            <ContractCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;