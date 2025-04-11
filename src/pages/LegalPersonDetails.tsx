
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import LegalPersonForm from "@/components/LegalPersonForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const LegalPersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in a real app, this would come from an API
  // Adaptado para corresponder à estrutura esperada pelo componente LegalPersonForm
  const company = {
    id: 1,
    company_name: "Empresa ABC Ltda",
    trade_name: "ABC Comercial",
    cnpj: "12.345.678/0001-90",
    state_registration: "123.456.789.000",
    street: "Av. Comercial",
    number: "1000",
    complement: "Sala 123",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zip_code: "01234-567",
    phone: "(11) 3456-7890",
    email: "contato@empresaabc.com",
    legal_rep_name: "José Silva",
    legal_rep_cpf: "123.456.789-00",
    legal_rep_role: "Diretor",
    bank: "Banco do Brasil",
    agency: "1234-5",
    account: "12345-6",
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
              onClick={() => navigate("/pessoas/juridica")}
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
            <LegalPersonForm initialData={company} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <h2 className="text-2xl font-bold text-warm-800">
                {company.company_name}
              </h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Dados da Empresa</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Nome Fantasia</dt>
                      <dd>{company.trade_name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">CNPJ</dt>
                      <dd>{company.cnpj}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Inscrição Estadual</dt>
                      <dd>{company.state_registration}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Contato</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Telefone</dt>
                      <dd>{company.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">E-mail</dt>
                      <dd>{company.email}</dd>
                    </div>
                  </dl>
                </div>

                <div className="col-span-2">
                  <h3 className="font-semibold mb-2">Endereço</h3>
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">Logradouro</dt>
                      <dd>{company.street}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Número</dt>
                      <dd>{company.number}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Complemento</dt>
                      <dd>{company.complement}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Bairro</dt>
                      <dd>{company.neighborhood}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Cidade</dt>
                      <dd>{company.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Estado</dt>
                      <dd>{company.state}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">CEP</dt>
                      <dd>{company.zip_code}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Representante Legal</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Nome</dt>
                      <dd>{company.legal_rep_name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">CPF</dt>
                      <dd>{company.legal_rep_cpf}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Cargo</dt>
                      <dd>{company.legal_rep_role}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Dados Bancários</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Banco</dt>
                      <dd>{company.bank}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Agência</dt>
                      <dd>{company.agency}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Conta</dt>
                      <dd>{company.account}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LegalPersonDetails;
