import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractSummaryCards from "@/components/dashboard/ContractSummaryCards";
import ContractValueChart from "@/components/dashboard/ContractValueChart";
import ContractCalendar from "@/components/dashboard/ContractCalendar";

const DashboardStats = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-warm-800">Estatísticas do Sistema</h1>
          
          <ContractSummaryCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ContractValueChart />
            <ContractCalendar />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardStats;