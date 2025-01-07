import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractCalendar from "@/components/dashboard/ContractCalendar";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { data: contractStats } = useQuery({
    queryKey: ["contractStats"],
    queryFn: async () => {
      // Mock data - replace with actual API call
      return {
        newContracts: 0,
        activeContracts: 0,
        expiringContracts: 0,
        totalValue: 0,
      };
    },
  });

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <ContractCalendar />
        </div>
      </main>
    </div>
  );
};

export default Index;