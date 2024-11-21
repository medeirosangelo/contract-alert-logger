import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractValueChart from "@/components/dashboard/ContractValueChart";
import ContractSummaryCards from "@/components/dashboard/ContractSummaryCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-2xl font-bold text-warm-800">Dashboard</h1>
          <ContractSummaryCards />
          <ContractValueChart />
        </div>
      </main>
    </div>
  );
};

export default Index;