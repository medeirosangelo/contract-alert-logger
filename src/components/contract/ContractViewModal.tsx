import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, Pencil } from "lucide-react";
import { TemplateEditor } from "./TemplateEditor";

interface ContractViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: {
    orgao: string;
    unidade: string;
    receitaDespesa: string;
    tipo: string;
    categoria: string;
    subcategoria: string;
    unidRequisitantes: string;
    numeros: string;
    cnpjCpf: string;
  } | null;
}

const ContractViewModal = ({ isOpen, onClose, contract }: ContractViewModalProps) => {
  if (!contract) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Detalhes do Contrato</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full h-full">
          <TabsList>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="edit">Editar</TabsTrigger>
            <TabsTrigger value="pdf">Visualizar PDF</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="h-[calc(100%-48px)] overflow-y-auto">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Órgão</label>
                  <p>{contract.orgao}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Unidade</label>
                  <p>{contract.unidade}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Receita/Despesa</label>
                  <p>{contract.receitaDespesa}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipo</label>
                  <p>{contract.tipo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Categoria</label>
                  <p>{contract.categoria}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">CNPJ/CPF</label>
                  <p>{contract.cnpjCpf}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Baixar PDF
                </Button>
                <Button className="gap-2">
                  <Pencil className="w-4 h-4" />
                  Editar
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit" className="h-[calc(100%-48px)] overflow-y-auto">
            <TemplateEditor />
          </TabsContent>

          <TabsContent value="pdf" className="h-[calc(100%-48px)]">
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-gray-500">Visualização do PDF em desenvolvimento</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ContractViewModal;