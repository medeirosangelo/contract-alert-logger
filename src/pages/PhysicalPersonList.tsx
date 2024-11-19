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

const PhysicalPersonList = () => {
  // This would typically come from an API
  const people = [
    {
      id: 1,
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
    },
    // Add more mock data as needed
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
                  <TableRow key={person.id}>
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
    </div>
  );
};

export default PhysicalPersonList;