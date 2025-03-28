
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import InputMask from "react-input-mask";
import { Control } from "react-hook-form";

interface AdditionalInfoProps {
  witness1Name: string;
  witness1Cpf: string;
  witness2Name: string;
  witness2Cpf: string;
  signatureLocation: string;
  generalObservations: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formControl: Control<any>;
  errors: any;
}

const AdditionalInfo = ({
  witness1Name,
  witness1Cpf,
  witness2Name,
  witness2Cpf,
  signatureLocation,
  generalObservations,
  onChange,
  formControl,
  errors
}: AdditionalInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Informações Adicionais</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-md font-medium mb-3 text-warm-600">Testemunhas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <FormItem className="space-y-1">
                <Label htmlFor="witness1Name">
                  Nome da Testemunha 1
                </Label>
                <FormControl>
                  <Input
                    id="witness1Name"
                    name="witness1Name"
                    value={witness1Name}
                    onChange={onChange}
                  />
                </FormControl>
              </FormItem>
            </div>
            
            <div className="space-y-2">
              <FormItem className="space-y-1">
                <Label htmlFor="witness1Cpf">
                  CPF da Testemunha 1
                </Label>
                <FormControl>
                  <InputMask
                    mask="999.999.999-99"
                    maskChar={null}
                    value={witness1Cpf}
                    onChange={onChange}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        id="witness1Cpf"
                        name="witness1Cpf"
                      />
                    )}
                  </InputMask>
                </FormControl>
              </FormItem>
            </div>
            
            <div className="space-y-2">
              <FormItem className="space-y-1">
                <Label htmlFor="witness2Name">
                  Nome da Testemunha 2
                </Label>
                <FormControl>
                  <Input
                    id="witness2Name"
                    name="witness2Name"
                    value={witness2Name}
                    onChange={onChange}
                  />
                </FormControl>
              </FormItem>
            </div>
            
            <div className="space-y-2">
              <FormItem className="space-y-1">
                <Label htmlFor="witness2Cpf">
                  CPF da Testemunha 2
                </Label>
                <FormControl>
                  <InputMask
                    mask="999.999.999-99"
                    maskChar={null}
                    value={witness2Cpf}
                    onChange={onChange}
                  >
                    {(inputProps: any) => (
                      <Input
                        {...inputProps}
                        id="witness2Cpf"
                        name="witness2Cpf"
                      />
                    )}
                  </InputMask>
                </FormControl>
              </FormItem>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <FormItem className="space-y-1">
              <Label htmlFor="signatureLocation">
                Local de Assinatura
              </Label>
              <FormControl>
                <Input
                  id="signatureLocation"
                  name="signatureLocation"
                  value={signatureLocation}
                  onChange={onChange}
                />
              </FormControl>
            </FormItem>
          </div>
          
          <div className="space-y-2">
            <FormItem className="space-y-1">
              <Label htmlFor="generalObservations">
                Observações Gerais
              </Label>
              <FormControl>
                <Textarea
                  id="generalObservations"
                  name="generalObservations"
                  value={generalObservations}
                  onChange={onChange}
                  rows={4}
                />
              </FormControl>
            </FormItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
