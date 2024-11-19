import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentInfoProps {
  bank: string;
  agency: string;
  account: string;
  paymentTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentInfo = ({ bank, agency, account, paymentTerm, onChange }: PaymentInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Forma de Pagamento</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bank">Banco</Label>
          <Input
            id="bank"
            name="bank"
            value={bank}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="agency">Agência</Label>
          <Input
            id="agency"
            name="agency"
            value={agency}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="account">Conta Corrente</Label>
          <Input
            id="account"
            name="account"
            value={account}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="paymentTerm">Prazo para Pagamento após Recebimento (dias)</Label>
          <Input
            id="paymentTerm"
            name="paymentTerm"
            type="number"
            value={paymentTerm}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;