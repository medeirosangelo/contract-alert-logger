
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { UserPlus, Loader2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { physicalPersonsApi } from "@/services/physicalPersons";
import { PhysicalPerson } from "@/services/types";
import { toast, Toaster } from "sonner";
import PersonList from "@/components/lists/PersonList";
import EmptyState from "@/components/common/EmptyState";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { useEffect, useState } from "react";

const PhysicalPersonList = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { data: people, isLoading, error, refetch, isError } = useQuery({
    queryKey: ["physicalPersons"],
    queryFn: async () => {
      try {
        console.log("Buscando lista de pessoas físicas...");
        const data = await physicalPersonsApi.getAll();
        console.log("Pessoas físicas encontradas:", data?.length || 0);
        return data;
      } catch (error) {
        console.error("Erro ao buscar pessoas físicas:", error);
        toast.error("Erro ao carregar pessoas físicas");
        throw error;
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 1
  });

  const handleRefresh = () => {
    toast.info("Atualizando lista de pessoas físicas...");
    refetch();
  };

  const handlePersonClick = (id: string) => {
    navigate(`/physical-persons/${id}`);
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <Toaster position="top-right" />
      <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-warm-800">Lista de Pessoas Físicas</h2>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleRefresh}
                className="mr-2"
                title="Atualizar lista"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Link to="/physical-persons/new">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <UserPlus className="h-4 w-4" />
                  Nova Pessoa Física
                </Button>
              </Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <ErrorDisplay
              title="Erro ao carregar pessoas físicas"
              message="Não foi possível carregar a lista de pessoas físicas do banco de dados."
              error={error instanceof Error ? error.message : 'Erro desconhecido no servidor'}
              onRetry={handleRefresh}
            />
          ) : people && people.length > 0 ? (
            <PersonList people={people} onPersonClick={handlePersonClick} />
          ) : (
            <EmptyState
              title="Nenhuma pessoa física cadastrada no banco de dados."
              description="O banco de dados está vazio. Cadastre sua primeira pessoa física para começar."
              actionText="Cadastrar Pessoa Física"
              actionHref="/physical-persons/new"
              icon={<UserPlus className="h-4 w-4" />}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default PhysicalPersonList;
