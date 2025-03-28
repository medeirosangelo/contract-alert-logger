
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import InputMask from "react-input-mask";
import { Control } from "react-hook-form";

interface ContractIdentificationProps {
  contractNumber: string;
  object: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formControl: Control<any>;
  errors: any;
}

const ContractIdentification = ({ 
  contractNumber, 
  object, 
  onChange,
  formControl,
  errors
}: ContractIdentificationProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Identificação do Contrato</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="contractNumber" className={errors.contractNumber ? "text-destructive" : ""}>
              Número do Contrato
            </Label>
            <FormControl>
              <Input
                id="contractNumber"
                name="contractNumber"
                value={contractNumber}
                onChange={onChange}
                className={errors.contractNumber ? "border-destructive" : ""}
              />
            </FormControl>
            {errors.contractNumber && (
              <FormMessage>{errors.contractNumber.message}</FormMessage>
            )}
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="object" className={errors.object ? "text-destructive" : ""}>
              Objeto do Contrato
            </Label>
            <FormControl>
              <Input
                id="object"
                name="object"
                value={object}
                onChange={onChange}
                className={errors.object ? "border-destructive" : ""}
              />
            </FormControl>
            {errors.object && (
              <FormMessage>{errors.object.message}</FormMessage>
            )}
          </FormItem>
        </div>
      </div>
    </div>
  );
};

export default ContractIdentification;
