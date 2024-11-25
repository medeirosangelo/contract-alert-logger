import { useState } from "react";
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
import { Download } from "lucide-react";
import ContractViewModal from "@/components/contract/ContractViewModal";
import { useQuery } from "@tanstack/react-query";

const ContractList = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isFinalized = location.pathname === "/contratos/finalizados";

  const { data: contracts } = useQuery({
    queryKey: ["contracts", isFinalized],
    queryFn: async () => {
      // Mock data - replace with actual API call
      const allContracts = [
        {
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

      return allContracts.filter(contract => 
        isFinalized ? contract.status === "Finalizado" : contract.status === "Ativo"
      );
    },
  });

  const handleContractClick = (contract) => {
    setSelectedContract(contract);
    setIsModalOpen(true);
  };

  const handleGeneratePDF = async (contract) => {
    // Mock PDF generation - replace with actual PDF generation logic
    const pdfWindow = window.open("", "_blank");
    if (pdfWindow) {
      pdfWindow.document.write(`
        <h1>Contrato ${contract.numeros}</h1>
        <p>Gerando PDF...</p>
      `);
      // Add your PDF generation logic here
    }
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
                  {contracts?.map((contract, index) => (
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGeneratePDF(contract)}
                        >
                          Gerar PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>

      <ContractViewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contract={selectedContract}
      />
    </div>
  );
};

export default ContractList;
