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

const PhysicalPersonList = () => {
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  
  // This would typically come from an API
  const people = [
    {
      id: 1,
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
      rg: "12.345.678-9",
      birthDate: "1990-01-01",
      address: {
        street: "Rua das Flores",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01234-567",
      },
      role: "Gerente",
    },
  ];

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Lista de Pessoas Físicas</h2>
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>CPF</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map((person) => (
                  <TableRow 
                    key={person.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedPerson(person)}
                  >
                    <TableCell>{person.name}</TableCell>
                    <TableCell>{person.cpf}</TableCell>
                    <TableCell>{person.email}</TableCell>
                    <TableCell>{person.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      <Sheet open={!!selectedPerson} onOpenChange={() => setSelectedPerson(null)}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Detalhes da Pessoa Física</SheetTitle>
          </SheetHeader>
          {selectedPerson && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold">Dados Pessoais</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Nome</p>
                    <p>{selectedPerson.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CPF</p>
                    <p>{selectedPerson.cpf}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">RG</p>
                    <p>{selectedPerson.rg}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Data de Nascimento</p>
                    <p>{selectedPerson.birthDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Contato</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">E-mail</p>
                    <p>{selectedPerson.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Telefone</p>
                    <p>{selectedPerson.phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold">Endereço</h3>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Logradouro</p>
                    <p>{selectedPerson.address.street}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Número</p>
                    <p>{selectedPerson.address.number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Complemento</p>
                    <p>{selectedPerson.address.complement}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bairro</p>
                    <p>{selectedPerson.address.neighborhood}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cidade</p>
                    <p>{selectedPerson.address.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estado</p>
                    <p>{selectedPerson.address.state}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CEP</p>
                    <p>{selectedPerson.address.zipCode}</p>
                  </div>
                </div>
              </div>

              {selectedPerson.role && (
                <div>
                  <h3 className="font-semibold">Cargo/Função</h3>
                  <p className="mt-2">{selectedPerson.role}</p>
                </div>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PhysicalPersonList;