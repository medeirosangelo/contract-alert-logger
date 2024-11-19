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

const LegalPersonList = () => {
  // This would typically come from an API
  const companies = [
    {
      id: 1,
      companyName: "Empresa ABC Ltda",
      cnpj: "12.345.678/0001-90",
      email: "contato@empresaabc.com",
      phone: "(11) 3456-7890",
    },
    // Add more mock data as needed
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
                  <TableRow key={company.id}>
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
    </div>
  );
};

export default LegalPersonList;