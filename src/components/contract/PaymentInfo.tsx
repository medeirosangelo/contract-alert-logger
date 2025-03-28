
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface PaymentInfoProps {
  bank: string;
  agency: string;
  account: string;
  paymentTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formControl: Control<any>;
  errors: any;
}

const PaymentInfo = ({ 
  bank, 
  agency, 
  account, 
  paymentTerm, 
  onChange,
  formControl,
  errors
}: PaymentInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Forma de Pagamento</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="bank">
              Banco
            </Label>
            <FormControl>
              <Input
                id="bank"
                name="bank"
                value={bank}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="agency">
              Agência
            </Label>
            <FormControl>
              <Input
                id="agency"
                name="agency"
                value={agency}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="account">
              Conta Corrente
            </Label>
            <FormControl>
              <Input
                id="account"
                name="account"
                value={account}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="paymentTerm">
              Prazo para Pagamento após Recebimento (dias)
            </Label>
            <FormControl>
              <Input
                id="paymentTerm"
                name="paymentTerm"
                type="number"
                value={paymentTerm}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
