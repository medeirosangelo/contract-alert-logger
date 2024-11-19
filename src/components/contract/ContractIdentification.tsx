import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContractIdentificationProps {
  contractNumber: string;
  object: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContractIdentification = ({ contractNumber, object, onChange }: ContractIdentificationProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Identificação do Contrato</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contractNumber">Número do Contrato</Label>
          <Input
            id="contractNumber"
            name="contractNumber"
            value={contractNumber}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="object">Objeto do Contrato</Label>
          <Input
            id="object"
            name="object"
            value={object}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractIdentification;