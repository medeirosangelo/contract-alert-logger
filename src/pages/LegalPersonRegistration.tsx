
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import LegalPersonForm from "@/components/LegalPersonForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const LegalPersonRegistration = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <Toaster position="top-right" />
      <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 flex items-center">
            <Link to="/legal-persons">
              <Button variant="ghost" className="gap-2 text-warm-700 hover:text-primary hover:bg-warm-100">
                <ArrowLeft className="h-4 w-4" />
                Voltar para lista
              </Button>
            </Link>
          </div>
          <LegalPersonForm />
        </div>
      </main>
    </div>
  );
};

export default LegalPersonRegistration;
