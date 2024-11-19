import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContractDetailsProps {
  totalValue: string;
  duration: string;
  signatureDate: string;
  publicationDate: string;
  priceAdjustmentTerm: string;
  adjustmentIndex: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContractDetails = ({
  totalValue,
  duration,
  signatureDate,
  publicationDate,
  priceAdjustmentTerm,
  adjustmentIndex,
  onChange,
}: ContractDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Detalhes do Contrato</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="totalValue">Valor Total do Contrato (R$)</Label>
          <Input
            id="totalValue"
            name="totalValue"
            type="number"
            step="0.01"
            value={totalValue}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Prazo de Vigência (meses)</Label>
          <Input
            id="duration"
            name="duration"
            type="number"
            value={duration}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signatureDate">Data de Assinatura</Label>
          <Input
            id="signatureDate"
            name="signatureDate"
            type="date"
            value={signatureDate}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="publicationDate">Data de Publicação no Diário Oficial</Label>
          <Input
            id="publicationDate"
            name="publicationDate"
            type="date"
            value={publicationDate}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priceAdjustmentTerm">Prazo para Reajuste de Preço (anos)</Label>
          <Input
            id="priceAdjustmentTerm"
            name="priceAdjustmentTerm"
            type="number"
            value={priceAdjustmentTerm}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="adjustmentIndex">Índice de Reajuste</Label>
          <Input
            id="adjustmentIndex"
            name="adjustmentIndex"
            placeholder="Ex.: IGP-M"
            value={adjustmentIndex}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;