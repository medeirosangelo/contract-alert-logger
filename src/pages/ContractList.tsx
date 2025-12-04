import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, Edit, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { generateContractPDF } from "@/utils/pdfGenerator";
import { Badge } from "@/components/ui/badge";
import ContractViewModal from "@/components/contract/ContractViewModal";
import ContractEditModal from "@/components/contract/ContractEditModal";

const ContractList = () => {
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  const isFinalized = location.pathname.includes("finalizados");

  const { data: contracts, isLoading, refetch } = useQuery({
    queryKey: ["contracts", isFinalized],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contracts')
        .select(`
          *,
          contractor:legal_persons!contractor_id(company_name, cnpj, trade_name),
          contracted:legal_persons!contracted_id(company_name, cnpj, trade_name)
        `)
        .eq('status', isFinalized ? 'finished' : 'active')
        .order('end_date', { ascending: true });
        
      if (error) {
        console.error("Erro ao buscar contratos:", error);
        throw error;
      }
      
      return data || [];
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getDaysLeft = (endDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (endDate: string) => {
    const daysLeft = getDaysLeft(endDate);
    if (daysLeft <= 30) {
      return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Crítico</Badge>;
    }
    if (daysLeft <= 60) {
      return <Badge className="bg-orange-500 hover:bg-orange-600">Atenção</Badge>;
    }
    return <Badge className="bg-green-500 hover:bg-green-600">Normal</Badge>;
  };

  const handleGeneratePDF = async (contractId: string) => {
    try {
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

  const viewContract = (contract: any) => {
    setSelectedContract(contract);
    setIsViewModalOpen(true);
  };

  const editContract = (contract: any) => {
    setSelectedContract(contract);
    setIsEditModalOpen(true);
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

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nº Contrato</TableHead>
                    <TableHead>Contratada</TableHead>
                    <TableHead>Objeto</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Início</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Dias Restantes</TableHead>
                    <TableHead>Situação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10">
                        Carregando contratos...
                      </TableCell>
                    </TableRow>
                  ) : !contracts || contracts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-10">
                        Nenhum contrato {isFinalized ? "finalizado" : "ativo"} encontrado.
                      </TableCell>
                    </TableRow>
                  ) : (
                    contracts.map((contract) => {
                      const daysLeft = getDaysLeft(contract.end_date);
                      return (
                        <TableRow 
                          key={contract.id}
                          className="cursor-pointer hover:bg-gray-50"
                        >
                          <TableCell className="font-semibold">{contract.contract_number}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{contract.contracted?.trade_name || contract.contracted?.company_name || '-'}</p>
                              <p className="text-xs text-muted-foreground">{contract.contracted?.cnpj}</p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate" title={contract.object}>
                            {contract.object}
                          </TableCell>
                          <TableCell className="font-semibold text-primary">
                            {formatCurrency(Number(contract.total_value))}
                          </TableCell>
                          <TableCell>{formatDate(contract.start_date)}</TableCell>
                          <TableCell className="font-medium">{formatDate(contract.end_date)}</TableCell>
                          <TableCell>
                            <span className={`font-bold ${
                              daysLeft <= 30 ? 'text-red-600' : 
                              daysLeft <= 60 ? 'text-orange-600' : 
                              'text-green-600'
                            }`}>
                              {daysLeft} dias
                            </span>
                          </TableCell>
                          <TableCell>{getStatusBadge(contract.end_date)}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewContract(contract)}
                                title="Ver Contrato"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editContract(contract)}
                                title="Editar Contrato"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleGeneratePDF(contract.id)}
                                title="Baixar PDF"
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>

            {contracts && contracts.length > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                Exibindo {contracts.length} contrato(s)
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de Visualização */}
      <ContractViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contract={selectedContract}
      />

      {/* Modal de Edição */}
      {selectedContract && (
        <ContractEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          contract={selectedContract}
          onSave={() => refetch()}
        />
      )}
    </div>
  );
};

export default ContractList;
