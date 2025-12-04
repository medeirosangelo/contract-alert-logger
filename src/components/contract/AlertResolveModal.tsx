import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Plus, XCircle } from "lucide-react";

interface AlertResolveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolve: (action: string, data?: { additionalValue?: number; additionalMonths?: number }) => void;
  contractNumber: string;
  contractValue: number;
  endDate: string;
}

const AlertResolveModal = ({ 
  isOpen, 
  onClose, 
  onResolve, 
  contractNumber, 
  contractValue,
  endDate 
}: AlertResolveModalProps) => {
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [additionalValue, setAdditionalValue] = useState<string>("");
  const [additionalMonths, setAdditionalMonths] = useState<string>("12");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const handleResolve = () => {
    if (!selectedAction) return;

    if (selectedAction === "aditivo") {
      onResolve("aditivo", {
        additionalValue: parseFloat(additionalValue) || 0,
        additionalMonths: parseInt(additionalMonths) || 12,
      });
    } else {
      onResolve(selectedAction);
    }
    
    // Reset form
    setSelectedAction("");
    setAdditionalValue("");
    setAdditionalMonths("12");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Resolver Alerta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Informações do Contrato */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Contrato</p>
            <p className="text-lg font-bold">{contractNumber}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Valor Atual</p>
                <p className="font-semibold text-primary">{formatCurrency(contractValue)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vencimento</p>
                <p className="font-semibold">{formatDate(endDate)}</p>
              </div>
            </div>
          </div>

          {/* Opções de Ação */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Selecione a ação:</Label>
            <RadioGroup value={selectedAction} onValueChange={setSelectedAction}>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="aditivo" id="aditivo" />
                <Label htmlFor="aditivo" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Plus className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Termo Aditivo</p>
                    <p className="text-sm text-muted-foreground">Estender prazo e/ou ajustar valor</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="finalizar" id="finalizar" />
                <Label htmlFor="finalizar" className="flex items-center gap-2 cursor-pointer flex-1">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Finalizar Contrato</p>
                    <p className="text-sm text-muted-foreground">Encerrar contrato normalmente</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="cancelar" id="cancelar" />
                <Label htmlFor="cancelar" className="flex items-center gap-2 cursor-pointer flex-1">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-medium">Cancelar Contrato</p>
                    <p className="text-sm text-muted-foreground">Rescindir contrato antecipadamente</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Campos do Aditivo */}
          {selectedAction === "aditivo" && (
            <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800">Dados do Aditivo</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="additionalValue">Valor Adicional (R$)</Label>
                  <Input
                    id="additionalValue"
                    type="number"
                    placeholder="0,00"
                    value={additionalValue}
                    onChange={(e) => setAdditionalValue(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Novo total: {formatCurrency(contractValue + (parseFloat(additionalValue) || 0))}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalMonths">Prazo Adicional (meses)</Label>
                  <Input
                    id="additionalMonths"
                    type="number"
                    placeholder="12"
                    value={additionalMonths}
                    onChange={(e) => setAdditionalMonths(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleResolve}
            disabled={!selectedAction}
            className="bg-primary"
          >
            Confirmar Resolução
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertResolveModal;
