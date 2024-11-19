import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractForm from "@/components/ContractForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-5xl mx-auto">
          <ContractForm />
        </div>
      </main>
    </div>
  );
};

export default Index;