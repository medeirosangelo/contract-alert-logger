import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AdditionalInfoProps {
  witness1Name: string;
  witness1Cpf: string;
  witness2Name: string;
  witness2Cpf: string;
  signatureLocation: string;
  generalObservations: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AdditionalInfo = ({ 
  witness1Name, 
  witness1Cpf, 
  witness2Name, 
  witness2Cpf, 
  signatureLocation, 
  generalObservations, 
  onChange 
}: AdditionalInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Outros Dados</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="witness1Name">Nome da 1ª Testemunha</Label>
          <Input
            id="witness1Name"
            name="witness1Name"
            value={witness1Name}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="witness1Cpf">CPF da 1ª Testemunha</Label>
          <Input
            id="witness1Cpf"
            name="witness1Cpf"
            value={witness1Cpf}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="witness2Name">Nome da 2ª Testemunha</Label>
          <Input
            id="witness2Name"
            name="witness2Name"
            value={witness2Name}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="witness2Cpf">CPF da 2ª Testemunha</Label>
          <Input
            id="witness2Cpf"
            name="witness2Cpf"
            value={witness2Cpf}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signatureLocation">Local de Assinatura (cidade/estado)</Label>
          <Input
            id="signatureLocation"
            name="signatureLocation"
            value={signatureLocation}
            onChange={onChange}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="generalObservations">Observações Gerais</Label>
          <Textarea
            id="generalObservations"
            name="generalObservations"
            value={generalObservations}
            onChange={onChange}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;