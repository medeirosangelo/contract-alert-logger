
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import ContractForm from "@/components/ContractForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContractRegistration = () => {
  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center">
            <Link to="/contracts">
              <Button variant="ghost" className="gap-2 text-warm-700 hover:text-primary hover:bg-warm-100">
                <ArrowLeft className="h-4 w-4" />
                Voltar para lista
              </Button>
            </Link>
          </div>
          <ContractForm />
        </div>
      </main>
    </div>
  );
};

export default ContractRegistration;
