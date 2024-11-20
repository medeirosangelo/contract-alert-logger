import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from an API
  const companies = [
    {
      id: 1,
      companyName: "Empresa ABC Ltda",
      cnpj: "12.345.678/0001-90",
      email: "contato@empresaabc.com",
      phone: "(11) 3456-7890",
    },
    {
      id: 2,
      companyName: "XYZ Comércio S.A.",
      cnpj: "98.765.432/0001-10",
      email: "contato@xyz.com",
      phone: "(11) 2345-6789",
    },
    {
      id: 3,
      companyName: "Tech Solutions Ltda",
      cnpj: "45.678.901/0001-23",
      email: "contato@techsolutions.com",
      phone: "(11) 3456-7891",
    },
    {
      id: 4,
      companyName: "Indústria Beta S.A.",
      cnpj: "78.901.234/0001-56",
      email: "contato@beta.com",
      phone: "(11) 4567-8902",
    },
    {
      id: 5,
      companyName: "Gamma Serviços ME",
      cnpj: "32.109.876/0001-54",
      email: "contato@gamma.com",
      phone: "(11) 5678-9013",
    },
  ];

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-warm-800">Lista de Pessoas Jurídicas</h2>
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
                    onClick={() => navigate(`/pessoas/juridica/${company.id}`)}
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
    </div>
  );
};

export default LegalPersonList;