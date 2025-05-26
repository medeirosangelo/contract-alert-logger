
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
import { UserPlus, Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { physicalPersonsApi } from "@/services/physicalPersons";
import { PhysicalPerson } from "@/services/types";
import { toast, Toaster } from "sonner";

const PhysicalPersonList = () => {
  const navigate = useNavigate();
  
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

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <Toaster position="top-right" />
      <main className="ml-64 pt-16 p-6">
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
            <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-500" />
                <h3 className="font-medium text-lg">Erro ao carregar pessoas físicas</h3>
              </div>
              <p className="mb-3">Não foi possível carregar a lista de pessoas físicas do banco de dados.</p>
              <p className="text-sm mb-4">
                Detalhes: {error instanceof Error ? error.message : 'Erro desconhecido no servidor'}
              </p>
              <Button 
                variant="outline" 
                onClick={handleRefresh} 
                className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
              >
                <RefreshCw className="h-4 w-4" />
                Tentar novamente
              </Button>
            </div>
          ) : people && people.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-warm-50 border-b border-warm-200">
                <p className="text-warm-600">Total: <span className="font-medium">{people.length}</span> pessoas</p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Telefone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(people as PhysicalPerson[]).map((person) => (
                    <TableRow 
                      key={person.id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => navigate(`/physical-persons/${person.id}`)}
                    >
                      <TableCell className="font-medium">{person.full_name}</TableCell>
                      <TableCell>{person.cpf}</TableCell>
                      <TableCell>{person.email}</TableCell>
                      <TableCell>{person.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="bg-warm-50 border border-warm-200 p-8 rounded-lg text-center shadow-sm">
              <p className="text-warm-600 mb-4">Nenhuma pessoa física cadastrada no banco de dados.</p>
              <p className="text-warm-500 text-sm mb-6">
                O banco de dados está vazio. Cadastre sua primeira pessoa física para começar.
              </p>
              <Link to="/physical-persons/new">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <UserPlus className="h-4 w-4" />
                  Cadastrar Pessoa Física
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PhysicalPersonList;
