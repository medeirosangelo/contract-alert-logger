
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import LegalPersonForm from "@/components/LegalPersonForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { legalPersonsApi } from "@/services/legalPersons";
import { toast, Toaster } from "sonner";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const LegalPersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: company, isLoading, error, isError } = useQuery({
    queryKey: ["legalPerson", id],
    queryFn: () => {
      if (!id) throw new Error("ID da empresa não fornecido");
      return legalPersonsApi.getById(id);
    },
    enabled: !!id,
    retry: 1
  });

  if (!id) {
    return (
      <div className="min-h-screen bg-warm-50">
        <Navigation />
        <Header />
        <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
          <div className="max-w-5xl mx-auto">
            <ErrorDisplay
              title="ID não fornecido"
              message="Não foi possível identificar a pessoa jurídica."
              onRetry={() => navigate("/legal-persons")}
            />
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-50">
        <Navigation />
        <Header />
        <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
          <div className="max-w-5xl mx-auto flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  if (isError || !company) {
    return (
      <div className="min-h-screen bg-warm-50">
        <Navigation />
        <Header />
        <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
          <div className="max-w-5xl mx-auto">
            <ErrorDisplay
              title="Empresa não encontrada"
              message="Não foi possível carregar os dados desta pessoa jurídica."
              error={error instanceof Error ? error.message : 'Erro desconhecido'}
              onRetry={() => navigate("/legal-persons")}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <Toaster position="top-right" />
      <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate("/legal-persons")}
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-warm-800">Dados da Empresa</h3>
                  <dl className="space-y-2">
                    {company.trade_name && (
                      <div>
                        <dt className="text-sm text-warm-600">Nome Fantasia</dt>
                        <dd className="text-warm-800">{company.trade_name}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-warm-600">CNPJ</dt>
                      <dd className="text-warm-800">{company.cnpj}</dd>
                    </div>
                    {company.state_registration && (
                      <div>
                        <dt className="text-sm text-warm-600">Inscrição Estadual</dt>
                        <dd className="text-warm-800">{company.state_registration}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-warm-800">Contato</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-warm-600">Telefone</dt>
                      <dd className="text-warm-800">{company.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">E-mail</dt>
                      <dd className="text-warm-800">{company.email}</dd>
                    </div>
                  </dl>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="font-semibold mb-2 text-warm-800">Endereço</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-warm-600">Logradouro</dt>
                      <dd className="text-warm-800">{company.street}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">Número</dt>
                      <dd className="text-warm-800">{company.number}</dd>
                    </div>
                    {company.complement && (
                      <div>
                        <dt className="text-sm text-warm-600">Complemento</dt>
                        <dd className="text-warm-800">{company.complement}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-warm-600">Bairro</dt>
                      <dd className="text-warm-800">{company.neighborhood}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">Cidade</dt>
                      <dd className="text-warm-800">{company.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">Estado</dt>
                      <dd className="text-warm-800">{company.state}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">CEP</dt>
                      <dd className="text-warm-800">{company.zip_code}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-warm-800">Representante Legal</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-warm-600">Nome</dt>
                      <dd className="text-warm-800">{company.legal_rep_name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">CPF</dt>
                      <dd className="text-warm-800">{company.legal_rep_cpf}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">Cargo</dt>
                      <dd className="text-warm-800">{company.legal_rep_role}</dd>
                    </div>
                  </dl>
                </div>

                {(company.bank || company.agency || company.account) && (
                  <div>
                    <h3 className="font-semibold mb-2 text-warm-800">Dados Bancários</h3>
                    <dl className="space-y-2">
                      {company.bank && (
                        <div>
                          <dt className="text-sm text-warm-600">Banco</dt>
                          <dd className="text-warm-800">{company.bank}</dd>
                        </div>
                      )}
                      {company.agency && (
                        <div>
                          <dt className="text-sm text-warm-600">Agência</dt>
                          <dd className="text-warm-800">{company.agency}</dd>
                        </div>
                      )}
                      {company.account && (
                        <div>
                          <dt className="text-sm text-warm-600">Conta</dt>
                          <dd className="text-warm-800">{company.account}</dd>
                        </div>
                      )}
                    </dl>
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

export default LegalPersonDetails;
