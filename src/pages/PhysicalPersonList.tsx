
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { UserPlus, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { physicalPersonsApi } from "@/services/physicalPersons";

const PhysicalPersonList = () => {
  const navigate = useNavigate();
  
  const { data: people, isLoading, error } = useQuery({
    queryKey: ["physicalPersons"],
    queryFn: physicalPersonsApi.getAll,
  });

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-warm-800">Lista de Pessoas Físicas</h2>
            <Link to="/physical-persons/new">
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <UserPlus className="h-4 w-4" />
                Nova Pessoa Física
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
              Erro ao carregar pessoas físicas. Por favor, tente novamente.
            </div>
          ) : people && people.length > 0 ? (
            <div className="bg-white rounded-lg shadow overflow-hidden">
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
                      onClick={() => navigate(`/physical-persons/${person.id}`)}
                    >
                      <TableCell className="font-medium">{person.full_name}</TableCell>
                      <TableCell>{person.cpf}</TableCell>
                      <TableCell>{person.email}</TableCell>
                      <TableCell>{person.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="bg-warm-50 border border-warm-200 p-8 rounded-lg text-center">
              <p className="text-warm-600 mb-4">Nenhuma pessoa física cadastrada.</p>
              <Link to="/physical-persons/new">
                <Button className="gap-2 bg-primary hover:bg-primary/90">
                  <UserPlus className="h-4 w-4" />
                  Cadastrar Pessoa Física
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PhysicalPersonList;
