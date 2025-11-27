
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { generateContractPDF } from "@/utils/pdfGenerator";

const ContractList = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Determinando se estamos na página de contratos finalizados
  const isFinalized = location.pathname.includes("finalizados");
  
  console.log("Página atual:", location.pathname, "isFinalized:", isFinalized);

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contracts", isFinalized],
    queryFn: async () => {
      console.log(`Buscando contratos ${isFinalized ? "finalizados" : "ativos"}`);
      
      try {
        // Buscar do Supabase com relacionamentos
        const { data, error } = await supabase
          .from('contracts')
          .select(`
            *,
            contractor:legal_persons!contractor_id(company_name, cnpj),
            contracted:legal_persons!contracted_id(company_name, cnpj)
          `)
          .eq('status', isFinalized ? 'finished' : 'active');
          
        if (error) {
          console.error("Erro ao buscar contratos:", error);
          throw error;
        }
        
        console.log(`${data?.length || 0} contratos encontrados`);
        
        // Se não houver dados no Supabase, usar dados mockados
        if (!data || data.length === 0) {
          return mockContracts.filter(contract => 
            isFinalized ? contract.status === "Finalizado" : contract.status === "Ativo"
          );
        }
        
        // Mapear dados do Supabase para o formato esperado pelo componente
        return data.map(contract => ({
          id: contract.id,
          orgao: contract.contractor?.company_name || "10000 - CAER",
          unidade: "0700000 - CAER",
          receitaDespesa: "Despesa",
          tipo: "Contrato",
          categoria: contract.object ? contract.object.split(" ")[0] : "Serviços",
          subcategoria: contract.object ? contract.object.split(" ").slice(1).join(" ") : "Geral",
          unidRequisitantes: contract.contract_number || "00000/2024",
          numeros: contract.contract_number || "00000/2024",
          cnpjCpf: contract.contracted?.cnpj || "05.939.467/0001-15",
          valor: Number(contract.total_value || 0),
          status: contract.status === "active" ? "Ativo" : "Finalizado"
        }));
      } catch (error) {
        console.error("Erro ao buscar contratos:", error);
        // Em caso de erro, retornar dados mockados
        return mockContracts.filter(contract => 
          isFinalized ? contract.status === "Finalizado" : contract.status === "Ativo"
        );
      }
    },
  });

  // Dados mockados para garantir visualização
  const mockContracts = [
    {
      id: "mock-1",
      orgao: "10000 - CAER",
      unidade: "0700000 - CAER",
      receitaDespesa: "Despesa",
      tipo: "Contrato",
      categoria: "Compras",
      subcategoria: "Material de Escritório",
      unidRequisitantes: "00001/2024",
      numeros: "00001/2024",
      cnpjCpf: "05.939.467/0001-15",
      valor: 150000,
      status: "Ativo",
    },
    {
      id: "mock-2",
      orgao: "10000 - CAER",
      unidade: "0700000 - CAER",
      receitaDespesa: "Despesa",
      tipo: "Contrato",
      categoria: "Serviços",
      subcategoria: "Manutenção",
      unidRequisitantes: "00002/2024",
      numeros: "00002/2024",
      cnpjCpf: "12.345.678/0001-90",
      valor: 75000,
      status: "Ativo",
    },
    {
      id: "mock-3",
      orgao: "10000 - CAER",
      unidade: "0700000 - CAER",
      receitaDespesa: "Despesa",
      tipo: "Contrato",
      categoria: "Serviços",
      subcategoria: "Consultoria",
      unidRequisitantes: "00003/2024",
      numeros: "00003/2024",
      cnpjCpf: "98.765.432/0001-10",
      valor: 200000,
      status: "Finalizado",
    },
    {
      id: "mock-4",
      orgao: "10000 - CAER",
      unidade: "0700000 - CAER",
      receitaDespesa: "Despesa",
      tipo: "Contrato",
      categoria: "Serviços",
      subcategoria: "Limpeza",
      unidRequisitantes: "00004/2024",
      numeros: "00004/2024",
      cnpjCpf: "11.222.333/0001-44",
      valor: 180000,
      status: "Ativo",
    },
    {
      id: "mock-5",
      orgao: "10000 - CAER",
      unidade: "0700000 - CAER",
      receitaDespesa: "Despesa",
      tipo: "Contrato",
      categoria: "Serviços",
      subcategoria: "Segurança",
      unidRequisitantes: "00005/2024",
      numeros: "00005/2024",
      cnpjCpf: "44.555.666/0001-77",
      valor: 250000,
      status: "Ativo",
    },
  ];

  const handleGeneratePDF = async (contractId: string) => {
    try {
      // Verificar se é um mock
      if (contractId.startsWith('mock-')) {
        toast({
          title: "Dados de Demonstração",
          description: "Este é um contrato de demonstração. Cadastre contratos reais para gerar PDFs completos.",
          variant: "destructive",
        });
        return;
      }

      // Buscar dados completos do contrato
      const { data: contract, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:legal_persons!contractor_id(company_name, cnpj, legal_rep_name, legal_rep_cpf),
          contracted:legal_persons!contracted_id(company_name, cnpj, legal_rep_name, legal_rep_cpf)
        `)
        .eq('id', contractId)
        .single();

      if (error) throw error;

      generateContractPDF(contract);

      toast({
        title: "PDF Gerado com Sucesso",
        description: "O arquivo foi baixado automaticamente.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erro ao Gerar PDF",
        description: "Não foi possível gerar o arquivo PDF.",
        variant: "destructive",
      });
    }
  };

  const viewContract = (contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">
              {isFinalized ? "Contratos Finalizados" : "Contratos Ativos"}
            </h2>
            
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              
              <Input
                placeholder="Pesquisar..."
                className="max-w-xs"
              />
            </div>

            <div className="mb-4">
              <Select defaultValue="25">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Resultados por página" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 resultados por página</SelectItem>
                  <SelectItem value="50">50 resultados por página</SelectItem>
                  <SelectItem value="100">100 resultados por página</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Orgão</TableHead>
                    <TableHead>Unidade</TableHead>
                    <TableHead>Receita/Despesa</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Subcategoria</TableHead>
                    <TableHead>Unid. Requisitantes</TableHead>
                    <TableHead>Números</TableHead>
                    <TableHead>CNPJ/CPF</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-10">
                        Carregando contratos...
                      </TableCell>
                    </TableRow>
                  ) : !contracts || contracts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={12} className="text-center py-10">
                        Nenhum contrato {isFinalized ? "finalizado" : "ativo"} encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    contracts.map((contract, index) => (
                      <TableRow 
                        key={index}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <TableCell>{contract.orgao}</TableCell>
                        <TableCell>{contract.unidade}</TableCell>
                        <TableCell>{contract.receitaDespesa}</TableCell>
                        <TableCell>{contract.tipo}</TableCell>
                        <TableCell>{contract.categoria}</TableCell>
                        <TableCell>{contract.subcategoria}</TableCell>
                        <TableCell>{contract.unidRequisitantes}</TableCell>
                        <TableCell>{contract.numeros}</TableCell>
                        <TableCell>{contract.cnpjCpf}</TableCell>
                        <TableCell>{contract.valor.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}</TableCell>
                        <TableCell>{contract.status}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleGeneratePDF(contract.id)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => viewContract(contract)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl">
          {selectedContract && (
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">
                Contrato {selectedContract.numeros}
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Dados do Contrato</h3>
                    <p>Orgão: {selectedContract.orgao}</p>
                    <p>Unidade: {selectedContract.unidade}</p>
                    <p>Tipo: {selectedContract.tipo}</p>
                    <p>Categoria: {selectedContract.categoria}</p>
                    <p>Subcategoria: {selectedContract.subcategoria}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Dados Financeiros</h3>
                    <p>Valor: {selectedContract.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}</p>
                    <p>Status: {selectedContract.status}</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={() => selectedContract?.id && handleGeneratePDF(selectedContract.id)}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Gerar PDF
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContractList;
