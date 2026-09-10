import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText, Plus, XCircle, ShieldCheck } from "lucide-react";
import type { ResolutionAction } from "@/services/alertResolutions";

interface AlertResolveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolve: (data: {
    action: ResolutionAction;
    additionalValue: number;
    additionalMonths: number;
    justification: string;
  }) => void;
  isSubmitting?: boolean;
  contractNumber: string;
  contractValue: number;
  endDate: string;
}

type Errors = Partial<Record<"action" | "additionalValue" | "additionalMonths" | "justification" | "confirm", string>>;

const AlertResolveModal = ({
  isOpen,
  onClose,
  onResolve,
  isSubmitting = false,
  contractNumber,
  contractValue,
  endDate,
}: AlertResolveModalProps) => {
  const [selectedAction, setSelectedAction] = useState<string>("");
  const [additionalValue, setAdditionalValue] = useState<string>("");
  const [additionalMonths, setAdditionalMonths] = useState<string>("12");
  const [justification, setJustification] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const formatDate = (dateString: string) =>
    dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "-";

  const reset = () => {
    setSelectedAction("");
    setAdditionalValue("");
    setAdditionalMonths("12");
    setJustification("");
    setConfirmed(false);
    setErrors({});
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validate = (): Errors => {
    const next: Errors = {};

    if (!selectedAction) next.action = "Escolha o que será feito com o contrato.";

    if (selectedAction === "aditivo") {
      const value = Number(additionalValue.replace(",", "."));
      const months = Number(additionalMonths);

      if (additionalValue.trim() === "" || Number.isNaN(value) || value < 0) {
        next.additionalValue = "Informe o valor adicional (use 0 se não houver acréscimo).";
      } else if (value > contractValue * 0.25) {
        next.additionalValue =
          "O acréscimo passa de 25% do valor do contrato. Reveja o valor ou registre em outro processo.";
      }

      if (!Number.isInteger(months) || months < 1 || months > 60) {
        next.additionalMonths = "O prazo adicional deve ser de 1 a 60 meses.";
      }
    }

    const text = justification.trim();
    if (text.length < 20) {
      next.justification = "Descreva o motivo com pelo menos 20 caracteres.";
    } else if (text.length > 500) {
      next.justification = "Use no máximo 500 caracteres.";
    }

    if (!confirmed) {
      next.confirm = "Confirme que as informações são verdadeiras.";
    }

    return next;
  };

  const handleSubmit = () => {
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onResolve({
      action: selectedAction as ResolutionAction,
      additionalValue: Number(additionalValue.replace(",", ".")) || 0,
      additionalMonths: Number(additionalMonths) || 0,
      justification: justification.trim(),
    });
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? handleClose() : undefined)}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Solicitar resolução do alerta</DialogTitle>
          <DialogDescription>
            O pedido fica registrado e só tem efeito depois da conferência de outra pessoa do sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">Contrato</p>
            <p className="text-lg font-bold">{contractNumber}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Valor atual</p>
                <p className="font-semibold text-primary">{formatCurrency(contractValue)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vencimento</p>
                <p className="font-semibold">{formatDate(endDate)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-semibold">Selecione a ação:</Label>
            <RadioGroup value={selectedAction} onValueChange={(v) => { setSelectedAction(v); setErrors((e) => ({ ...e, action: undefined })); }}>
              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="aditivo" id="aditivo" />
                <Label htmlFor="aditivo" className="flex items-center gap-2 cursor-pointer flex-1">
                  <Plus className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Termo aditivo</p>
                    <p className="text-sm text-muted-foreground">Estender prazo e/ou ajustar valor</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="finalizar" id="finalizar" />
                <Label htmlFor="finalizar" className="flex items-center gap-2 cursor-pointer flex-1">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Finalizar contrato</p>
                    <p className="text-sm text-muted-foreground">Encerrar contrato normalmente</p>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="cancelar" id="cancelar" />
                <Label htmlFor="cancelar" className="flex items-center gap-2 cursor-pointer flex-1">
                  <XCircle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium">Cancelar contrato</p>
                    <p className="text-sm text-muted-foreground">Rescindir contrato antecipadamente</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            {errors.action && <p className="text-sm text-destructive">{errors.action}</p>}
          </div>

          {selectedAction === "aditivo" && (
            <div className="space-y-4 p-4 bg-muted/40 rounded-lg border">
              <h4 className="font-semibold">Dados do aditivo</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="additionalValue">Valor adicional (R$)</Label>
                  <Input
                    id="additionalValue"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0,00"
                    value={additionalValue}
                    onChange={(e) => setAdditionalValue(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Novo total: {formatCurrency(contractValue + (Number(additionalValue.replace(",", ".")) || 0))}
                  </p>
                  {errors.additionalValue && <p className="text-sm text-destructive">{errors.additionalValue}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additionalMonths">Prazo adicional (meses)</Label>
                  <Input
                    id="additionalMonths"
                    type="number"
                    min="1"
                    max="60"
                    placeholder="12"
                    value={additionalMonths}
                    onChange={(e) => setAdditionalMonths(e.target.value)}
                  />
                  {errors.additionalMonths && <p className="text-sm text-destructive">{errors.additionalMonths}</p>}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="justification">Justificativa</Label>
            <Textarea
              id="justification"
              rows={4}
              placeholder="Explique o motivo da decisão, processo administrativo, número do documento etc."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Mínimo de 20 caracteres</span>
              <span>{justification.trim().length}/500</span>
            </div>
            {errors.justification && <p className="text-sm text-destructive">{errors.justification}</p>}
          </div>

          <div className="flex items-start gap-3 rounded-lg border p-3">
            <Checkbox
              id="confirm"
              checked={confirmed}
              onCheckedChange={(v) => setConfirmed(v === true)}
              className="mt-1"
            />
            <Label htmlFor="confirm" className="text-sm font-normal leading-relaxed cursor-pointer">
              Declaro que as informações são verdadeiras e estou ciente de que este pedido será conferido
              por outra pessoa antes de valer no sistema.
            </Label>
          </div>
          {errors.confirm && <p className="text-sm text-destructive">{errors.confirm}</p>}

          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            Conferência dupla: quem solicita não pode aprovar.
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar para conferência"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertResolveModal;
