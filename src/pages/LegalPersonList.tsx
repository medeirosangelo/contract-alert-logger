
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
import { toast } from "sonner";

const LegalPersonList = () => {
  const navigate = useNavigate();
  
  const { data: companies, isLoading, error, refetch } = useQuery({
    queryKey: ["legalPersons"],
    queryFn: legalPersonsApi.getAll,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const handleRefresh = () => {
    toast.info("Atualizando lista de pessoas jurídicas...");
    refetch();
  };

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
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
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              <p>Erro ao carregar pessoas jurídicas. Por favor, tente novamente.</p>
              <p className="text-sm mt-2">Detalhes: {error instanceof Error ? error.message : 'Erro desconhecido'}</p>
            </div>
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
            <div className="bg-warm-50 border border-warm-200 p-8 rounded-lg text-center">
              <p className="text-warm-600 mb-4">Nenhuma pessoa jurídica cadastrada.</p>
              <Link to="/legal-persons/new">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <Building2 className="h-4 w-4" />
                  Cadastrar Pessoa Jurídica
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LegalPersonList;
