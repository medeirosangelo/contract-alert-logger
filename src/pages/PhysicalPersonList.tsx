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

const PhysicalPersonList = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from an API
  const people = [
    {
      id: 1,
      name: "João Silva",
      cpf: "123.456.789-00",
      email: "joao@email.com",
      phone: "(11) 98765-4321",
    },
    {
      id: 2,
      name: "Maria Santos",
      cpf: "987.654.321-00",
      email: "maria@email.com",
      phone: "(11) 91234-5678",
    },
    {
      id: 3,
      name: "Pedro Oliveira",
      cpf: "456.789.123-00",
      email: "pedro@email.com",
      phone: "(11) 94567-8901",
    },
    {
      id: 4,
      name: "Ana Costa",
      cpf: "789.123.456-00",
      email: "ana@email.com",
      phone: "(11) 95678-9012",
    },
    {
      id: 5,
      name: "Carlos Ferreira",
      cpf: "321.654.987-00",
      email: "carlos@email.com",
      phone: "(11) 96789-0123",
    },
  ];

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-warm-800">Lista de Pessoas Físicas</h2>
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
                    onClick={() => navigate(`/pessoas/fisica/${person.id}`)}
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
    </div>
  );
};

export default PhysicalPersonList;