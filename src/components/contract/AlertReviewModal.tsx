import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { actionLabel, type AlertResolution } from "@/services/alertResolutions";

interface AlertReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resolution: AlertResolution | null;
  contractNumber: string;
  isSameRequester: boolean;
  isSubmitting?: boolean;
  onDecide: (approve: boolean, notes: string) => void;
}

const AlertReviewModal = ({
  isOpen,
  onClose,
  resolution,
  contractNumber,
  isSameRequester,
  isSubmitting = false,
  onDecide,
}: AlertReviewModalProps) => {
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

  const reset = () => {
    setNotes("");
    setChecked(false);
    setError(null);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const decide = (approve: boolean) => {
    if (isSameRequester) {
      setError("Você fez este pedido. A conferência precisa ser feita por outra pessoa.");
      return;
    }
    if (approve && !checked) {
      setError("Marque a confirmação de que revisou os dados do pedido.");
      return;
    }
    if (!approve && notes.trim().length < 10) {
      setError("Para recusar, escreva o motivo com pelo menos 10 caracteres.");
      return;
    }
    setError(null);
    onDecide(approve, notes);
    reset();
  };

  if (!resolution) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (!open ? handleClose() : undefined)}>
      <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Conferir pedido</DialogTitle>
          <DialogDescription>
            Revise o pedido antes de aprovar. A aprovação altera o contrato no sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2 bg-muted/40">
            <p className="text-lg font-bold">Contrato {contractNumber}</p>
            <p className="text-sm">
              <span className="font-semibold">Ação solicitada: </span>
              {actionLabel(resolution.action)}
            </p>
            {resolution.action === "aditivo" && (
              <p className="text-sm">
                <span className="font-semibold">Aditivo: </span>
                {formatCurrency(resolution.additional_value)} · +{resolution.additional_months} meses
              </p>
            )}
            <p className="text-sm">
              <span className="font-semibold">Solicitado por: </span>
              {resolution.requested_by_name || "não identificado"} em{" "}
              {new Date(resolution.requested_at).toLocaleString("pt-BR")}
            </p>
            <div className="text-sm">
              <span className="font-semibold">Justificativa: </span>
              <p className="mt-1 whitespace-pre-line">{resolution.justification}</p>
            </div>
          </div>

          {isSameRequester ? (
            <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-destructive" />
              <span>
                Este pedido foi feito por você. Outra pessoa do sistema precisa conferir para que a
                resolução tenha efeito.
              </span>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="notes">Observação da conferência (obrigatória para recusar)</Label>
                <Textarea
                  id="notes"
                  rows={3}
                  placeholder="Ex.: conferido com o processo 2026/0012."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="flex items-start gap-3 rounded-lg border p-3">
                <Checkbox id="reviewed" checked={checked} onCheckedChange={(v) => setChecked(v === true)} className="mt-1" />
                <Label htmlFor="reviewed" className="text-sm font-normal leading-relaxed cursor-pointer">
                  Confirmo que revisei os valores, prazos e a justificativa deste pedido.
                </Label>
              </div>
            </>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            Toda decisão fica registrada com nome e data.
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Fechar
          </Button>
          <Button
            variant="destructive"
            onClick={() => decide(false)}
            disabled={isSubmitting || isSameRequester}
          >
            Recusar
          </Button>
          <Button onClick={() => decide(true)} disabled={isSubmitting || isSameRequester}>
            {isSubmitting ? "Salvando..." : "Aprovar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AlertReviewModal;
