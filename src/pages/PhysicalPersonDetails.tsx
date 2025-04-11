
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import PhysicalPersonForm from "@/components/PhysicalPersonForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PhysicalPersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in a real app, this would come from an API
  // Adaptado para corresponder à estrutura esperada pelo componente PhysicalPersonForm
  const person = {
    id: 1,
    full_name: "João Silva",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    birth_date: "1990-01-01",
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 45",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zip_code: "01234-567",
    phone: "(11) 98765-4321",
    email: "joao@email.com",
    role: "Gerente",
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/pessoas/fisica")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancelar Edição" : "Editar"}
            </Button>
          </div>

          {isEditing ? (
            <PhysicalPersonForm initialData={person} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-2xl font-bold text-warm-800">
                {person.full_name}
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Dados Pessoais</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">CPF</dt>
                      <dd>{person.cpf}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">RG</dt>
                      <dd>{person.rg}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Data de Nascimento</dt>
                      <dd>{person.birth_date}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Contato</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Telefone</dt>
                      <dd>{person.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">E-mail</dt>
                      <dd>{person.email}</dd>
                    </div>
                  </dl>
                </div>

                <div className="col-span-2">
                  <h3 className="font-semibold mb-2">Endereço</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">Logradouro</dt>
                      <dd>{person.street}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Número</dt>
                      <dd>{person.number}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Complemento</dt>
                      <dd>{person.complement}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Bairro</dt>
                      <dd>{person.neighborhood}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Cidade</dt>
                      <dd>{person.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Estado</dt>
                      <dd>{person.state}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">CEP</dt>
                      <dd>{person.zip_code}</dd>
                    </div>
                  </dl>
                </div>

                {person.role && (
                  <div>
                    <h3 className="font-semibold mb-2">Cargo/Função</h3>
                    <p>{person.role}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PhysicalPersonDetails;
