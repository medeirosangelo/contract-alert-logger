
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import InputMask from "react-input-mask";
import { Control } from "react-hook-form";

interface ContractorInfoProps {
  companyName: string;
  address: string;
  cnpj: string;
  legalRepName: string;
  legalRepCpf: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "contractor" | "contracted";
  formControl: Control<any>;
  errors: any;
}

const ContractorInfo = ({ 
  companyName, 
  address, 
  cnpj, 
  legalRepName, 
  legalRepCpf, 
  email, 
  onChange,
  type,
  formControl,
  errors
}: ContractorInfoProps) => {
  const prefix = type === "contractor" ? "contractor" : "contracted";
  const title = type === "contractor" ? "Contratante" : "Contratado";
  
  // Campo específico para o tipo "contracted"
  const showAdditionalFields = type === "contracted";
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Informações do {title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label 
              htmlFor={`${prefix}CompanyName`}
              className={errors[`${prefix}CompanyName`] ? "text-destructive" : ""}
            >
              Razão Social
            </Label>
            <FormControl>
              <Input
                id={`${prefix}CompanyName`}
                name={`${prefix}CompanyName`}
                value={companyName}
                onChange={onChange}
                className={errors[`${prefix}CompanyName`] ? "border-destructive" : ""}
              />
            </FormControl>
            {errors[`${prefix}CompanyName`] && (
              <FormMessage>{errors[`${prefix}CompanyName`].message}</FormMessage>
            )}
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label 
              htmlFor={`${prefix}Address`}
              className={errors[`${prefix}Address`] ? "text-destructive" : ""}
            >
              Endereço
            </Label>
            <FormControl>
              <Input
                id={`${prefix}Address`}
                name={`${prefix}Address`}
                value={address}
                onChange={onChange}
                className={errors[`${prefix}Address`] ? "border-destructive" : ""}
              />
            </FormControl>
            {errors[`${prefix}Address`] && (
              <FormMessage>{errors[`${prefix}Address`].message}</FormMessage>
            )}
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label 
              htmlFor={`${prefix}Cnpj`}
              className={errors[`${prefix}Cnpj`] ? "text-destructive" : ""}
            >
              CNPJ
            </Label>
            <FormControl>
              <InputMask
                mask="99.999.999/9999-99"
                maskChar={null}
                value={cnpj}
                onChange={onChange}
              >
                {(inputProps: any) => (
                  <Input
                    {...inputProps}
                    id={`${prefix}Cnpj`}
                    name={`${prefix}Cnpj`}
                    className={errors[`${prefix}Cnpj`] ? "border-destructive" : ""}
                  />
                )}
              </InputMask>
            </FormControl>
            {errors[`${prefix}Cnpj`] && (
              <FormMessage>{errors[`${prefix}Cnpj`].message}</FormMessage>
            )}
          </FormItem>
        </div>
        
        {showAdditionalFields && (
          <>
            <div className="space-y-2">
              <FormItem className="space-y-1">
                <Label 
                  htmlFor="legalRepName"
                  className={errors.legalRepName ? "text-destructive" : ""}
                >
                  Representante Legal
                </Label>
                <FormControl>
                  <Input
                    id="legalRepName"
                    name="legalRepName"
                    value={legalRepName}
                    onChange={onChange}
                    className={errors.legalRepName ? "border-destructive" : ""}
                  />
                </FormControl>
                {errors.legalRepName && (
                  <FormMessage>{errors.legalRepName.message}</FormMessage>
                )}
              </FormItem>
            </div>
            
            <div className="space-y-2">
              <FormItem className="space-y-1">
                <Label 
                  htmlFor="legalRepCpf"
                  className={errors.legalRepCpf ? "text-destructive" : ""}
                >
                  CPF do Representante
                </Label>
                <FormControl>
                  <InputMask
                    mask="999.999.999-99"
                    maskChar={null}
                    value={legalRepCpf}
                    onChange={onChange}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        id="legalRepCpf"
                        name="legalRepCpf"
                        className={errors.legalRepCpf ? "border-destructive" : ""}
                      />
                    )}
                  </InputMask>
                </FormControl>
                {errors.legalRepCpf && (
                  <FormMessage>{errors.legalRepCpf.message}</FormMessage>
                )}
              </FormItem>
            </div>
            
            <div className="space-y-2">
              <FormItem className="space-y-1">
                <Label 
                  htmlFor="email"
                  className={errors.email ? "text-destructive" : ""}
                >
                  E-mail
                </Label>
                <FormControl>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    className={errors.email ? "border-destructive" : ""}
                  />
                </FormControl>
                {errors.email && (
                  <FormMessage>{errors.email.message}</FormMessage>
                )}
              </FormItem>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContractorInfo;
