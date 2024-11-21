import { useState } from "react";
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

const ContractList = () => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contracts = [
    {
      orgao: "10000 - CAER",
      unidade: "0700000 - CAER",
      receitaDespesa: "Despesa",
      tipo: "Contrato",
      categoria: "Compras",
      subcategoria: "",
      unidRequisitantes: "00000/2001",
      numeros: "00000/2001",
      cnpjCpf: "05.939.467/0001-15",
    },
    // Add more mock data as needed
  ];

  const handleContractClick = (contract) => {
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
            <h2 className="text-2xl font-bold mb-6">Relatório - Lista Todos Contratos</h2>
            
            <div className="flex justify-between items-center mb-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Exportação
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract, index) => (
                    <TableRow 
                      key={index}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={() => handleContractClick(contract)}
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