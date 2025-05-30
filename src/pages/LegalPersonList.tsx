
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Building2, Loader2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { legalPersonsApi } from "@/services/legalPersons";
import { LegalPerson } from "@/services/types";
import { toast, Toaster } from "sonner";
import EmptyState from "@/components/common/EmptyState";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import { useEffect, useState } from "react";

const LegalPersonList = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const { data: companies, isLoading, error, refetch, isError } = useQuery({
    queryKey: ["legalPersons"],
    queryFn: async () => {
      try {
        console.log("Buscando lista de pessoas jurídicas...");
        const data = await legalPersonsApi.getAll();
        console.log("Pessoas jurídicas encontradas:", data?.length || 0);
        return data;
      } catch (error) {
        console.error("Erro ao buscar pessoas jurídicas:", error);
        toast.error("Erro ao carregar pessoas jurídicas");
        throw error;
      }
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 1
  });

  const handleRefresh = () => {
    toast.info("Atualizando lista de pessoas jurídicas...");
    refetch();
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <Toaster position="top-right" />
      <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-warm-800">Lista de Pessoas Jurídicas</h2>
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
              <Link to="/legal-persons/new">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Building2 className="h-4 w-4" />
                  Nova Pessoa Jurídica
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
              title="Erro ao carregar pessoas jurídicas"
              message="Não foi possível carregar a lista de pessoas jurídicas do banco de dados."
              error={error instanceof Error ? error.message : 'Erro desconhecido no servidor'}
              onRetry={handleRefresh}
            />
          ) : companies && companies.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-warm-50 border-b border-warm-200">
                <p className="text-warm-600">Total: <span className="font-medium">{companies.length}</span> empresas</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Razão Social</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(companies as LegalPerson[]).map((company) => (
                    <TableRow 
                      key={company.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate(`/legal-persons/${company.id}`)}
                    >
                      <TableCell className="font-medium">{company.company_name}</TableCell>
                      <TableCell>{company.cnpj}</TableCell>
                      <TableCell>{company.email}</TableCell>
                      <TableCell>{company.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <EmptyState
              title="Nenhuma pessoa jurídica cadastrada no banco de dados."
              description="O banco de dados está vazio. Cadastre sua primeira pessoa jurídica para começar."
              actionText="Cadastrar Pessoa Jurídica"
              actionHref="/legal-persons/new"
              icon={<Building2 className="h-4 w-4" />}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default LegalPersonList;
