import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContractorInfoProps {
  companyName: string;
  address: string;
  cnpj: string;
  legalRepName: string;
  legalRepCpf: string;
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "contractor" | "contracted";
}

const ContractorInfo = ({ companyName, address, cnpj, legalRepName, legalRepCpf, email, onChange, type }: ContractorInfoProps) => {
  const title = type === "contractor" ? "CONTRATANTE" : "CONTRATADA";
  const prefix = type === "contractor" ? "contractor" : "contracted";

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Dados da {title}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`${prefix}CompanyName`}>Razão Social</Label>
          <Input
            id={`${prefix}CompanyName`}
            name={`${prefix}CompanyName`}
            value={companyName}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${prefix}Address`}>Endereço</Label>
          <Input
            id={`${prefix}Address`}
            name={`${prefix}Address`}
            value={address}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${prefix}Cnpj`}>CNPJ</Label>
          <Input
            id={`${prefix}Cnpj`}
            name={`${prefix}Cnpj`}
            value={cnpj}
            onChange={onChange}
          />
        </div>
        {type === "contracted" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="legalRepName">Nome do Representante Legal</Label>
              <Input
                id="legalRepName"
                name="legalRepName"
                value={legalRepName}
                onChange={onChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legalRepCpf">CPF do Representante Legal</Label>
              <Input
                id="legalRepCpf"
                name="legalRepCpf"
                value={legalRepCpf}
                onChange={onChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail para Comunicação</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContractorInfo;