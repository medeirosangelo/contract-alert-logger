
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import PhysicalPersonForm from "@/components/PhysicalPersonForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { physicalPersonsApi } from "@/services/physicalPersons";
import { toast, Toaster } from "sonner";
import ErrorDisplay from "@/components/common/ErrorDisplay";

const PhysicalPersonDetails = () => {
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

  const { data: person, isLoading, error, isError } = useQuery({
    queryKey: ["physicalPerson", id],
    queryFn: () => {
      if (!id) throw new Error("ID da pessoa não fornecido");
      return physicalPersonsApi.getById(id);
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
              message="Não foi possível identificar a pessoa física."
              onRetry={() => navigate("/physical-persons")}
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

  if (isError || !person) {
    return (
      <div className="min-h-screen bg-warm-50">
        <Navigation />
        <Header />
        <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
          <div className="max-w-5xl mx-auto">
            <ErrorDisplay
              title="Pessoa não encontrada"
              message="Não foi possível carregar os dados desta pessoa física."
              error={error instanceof Error ? error.message : 'Erro desconhecido'}
              onRetry={() => navigate("/physical-persons")}
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
              onClick={() => navigate("/physical-persons")}
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2 text-warm-800">Dados Pessoais</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-warm-600">CPF</dt>
                      <dd className="text-warm-800">{person.cpf}</dd>
                    </div>
                    {person.rg && (
                      <div>
                        <dt className="text-sm text-warm-600">RG</dt>
                        <dd className="text-warm-800">{person.rg}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-warm-600">Data de Nascimento</dt>
                      <dd className="text-warm-800">{new Date(person.birth_date).toLocaleDateString('pt-BR')}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-warm-800">Contato</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-warm-600">Telefone</dt>
                      <dd className="text-warm-800">{person.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">E-mail</dt>
                      <dd className="text-warm-800">{person.email}</dd>
                    </div>
                  </dl>
                </div>

                <div className="lg:col-span-2">
                  <h3 className="font-semibold mb-2 text-warm-800">Endereço</h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-warm-600">Logradouro</dt>
                      <dd className="text-warm-800">{person.street}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">Número</dt>
                      <dd className="text-warm-800">{person.number}</dd>
                    </div>
                    {person.complement && (
                      <div>
                        <dt className="text-sm text-warm-600">Complemento</dt>
                        <dd className="text-warm-800">{person.complement}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="text-sm text-warm-600">Bairro</dt>
                      <dd className="text-warm-800">{person.neighborhood}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">Cidade</dt>
                      <dd className="text-warm-800">{person.city}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">Estado</dt>
                      <dd className="text-warm-800">{person.state}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-warm-600">CEP</dt>
                      <dd className="text-warm-800">{person.zip_code}</dd>
                    </div>
                  </dl>
                </div>

                {person.role && (
                  <div className="lg:col-span-2">
                    <h3 className="font-semibold mb-2 text-warm-800">Cargo/Função</h3>
                    <p className="text-warm-800">{person.role}</p>
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
