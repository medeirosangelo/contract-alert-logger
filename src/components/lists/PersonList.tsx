
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PhysicalPerson } from "@/services/types";

interface PersonListProps {
  people: PhysicalPerson[];
  onPersonClick: (id: string) => void;
}

const PersonList = ({ people, onPersonClick }: PersonListProps) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-warm-50 border-b border-warm-200">
        <p className="text-warm-600">Total: <span className="font-medium">{people.length}</span> pessoas</p>
      </div>
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
              onClick={() => onPersonClick(person.id)}
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
  );
};

export default PersonList;
