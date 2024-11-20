import { useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const LegalPersonList = () => {
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  
  // This would typically come from an API
  const companies = [
    {
      id: 1,
      companyName: "Empresa ABC Ltda",
      tradeName: "ABC Comercial",
      cnpj: "12.345.678/0001-90",
      stateRegistration: "123.456.789.000",
      email: "contato@empresaabc.com",
      phone: "(11) 3456-7890",
      address: {
        street: "Av. Comercial",
        number: "1000",
        complement: "Sala 123",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
      },
      legalRepresentative: {
        name: "José Silva",
        cpf: "123.456.789-00",
        role: "Diretor",
      },
      bankInfo: {
        bank: "Banco do Brasil",
        agency: "1234-5",
        account: "12345-6",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Lista de Pessoas Jurídicas</h2>
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Razão Social</TableHead>
                  <TableHead>CNPJ</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow 
                    key={company.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedCompany(company)}
                  >
                    <TableCell>{company.companyName}</TableCell>
                    <TableCell>{company.cnpj}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <Sheet open={!!selectedCompany} onOpenChange={() => setSelectedCompany(null)}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Detalhes da Pessoa Jurídica</SheetTitle>
          </SheetHeader>
          {selectedCompany && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold">Dados da Empresa</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Razão Social</p>
                    <p>{selectedCompany.companyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nome Fantasia</p>
                    <p>{selectedCompany.tradeName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CNPJ</p>
                    <p>{selectedCompany.cnpj}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Inscrição Estadual</p>
                    <p>{selectedCompany.stateRegistration}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Contato</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p>{selectedCompany.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p>{selectedCompany.phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Endereço</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Logradouro</p>
                    <p>{selectedCompany.address.street}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Número</p>
                    <p>{selectedCompany.address.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Complemento</p>
                    <p>{selectedCompany.address.complement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bairro</p>
                    <p>{selectedCompany.address.neighborhood}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cidade</p>
                    <p>{selectedCompany.address.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <p>{selectedCompany.address.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CEP</p>
                    <p>{selectedCompany.address.zipCode}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Representante Legal</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p>{selectedCompany.legalRepresentative.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CPF</p>
                    <p>{selectedCompany.legalRepresentative.cpf}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cargo</p>
                    <p>{selectedCompany.legalRepresentative.role}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Dados Bancários</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Banco</p>
                    <p>{selectedCompany.bankInfo.bank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Agência</p>
                    <p>{selectedCompany.bankInfo.agency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Conta</p>
                    <p>{selectedCompany.bankInfo.account}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default LegalPersonList;