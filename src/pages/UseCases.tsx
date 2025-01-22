import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { UserRound, Users } from "lucide-react";

const UseCases = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold mb-8">Casos de Uso do Sistema</h1>

            {/* Diagrama de Casos de Uso */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Diagrama de Atores e Funcionalidades</h2>
              
              <div className="relative bg-warm-50 p-8 rounded-lg border border-warm-200">
                {/* Atores */}
                <div className="flex justify-between mb-12">
                  {/* Administrador */}
                  <div className="flex flex-col items-center">
                    <UserRound size={48} className="text-primary mb-2" />
                    <span className="font-semibold">Administrador</span>
                  </div>
                  
                  {/* Usuário do Sistema */}
                  <div className="flex flex-col items-center">
                    <Users size={48} className="text-primary mb-2" />
                    <span className="font-semibold">Usuário do Sistema</span>
                  </div>
                </div>

                {/* Conexões e Funcionalidades */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Funcionalidades do Administrador */}
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-warm-200">
                      <h3 className="font-semibold text-primary mb-2">Gerenciamento de Usuários</h3>
                      <ul className="list-disc list-inside text-sm">
                        <li>Criar novos usuários</li>
                        <li>Definir permissões</li>
                        <li>Gerenciar acessos</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-warm-200">
                      <h3 className="font-semibold text-primary mb-2">Configurações do Sistema</h3>
                      <ul className="list-disc list-inside text-sm">
                        <li>Definir parâmetros</li>
                        <li>Configurar alertas</li>
                        <li>Monitorar logs</li>
                      </ul>
                    </div>
                  </div>

                  {/* Funcionalidades do Usuário */}
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-warm-200">
                      <h3 className="font-semibold text-primary mb-2">Gestão de Contratos</h3>
                      <ul className="list-disc list-inside text-sm">
                        <li>Cadastrar contratos</li>
                        <li>Renovar contratos</li>
                        <li>Finalizar contratos</li>
                        <li>Gerar documentos</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-warm-200">
                      <h3 className="font-semibold text-primary mb-2">Gestão de Pessoas</h3>
                      <ul className="list-disc list-inside text-sm">
                        <li>Cadastrar pessoa física</li>
                        <li>Cadastrar pessoa jurídica</li>
                        <li>Gerenciar cadastros</li>
                      </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-warm-200">
                      <h3 className="font-semibold text-primary mb-2">Alertas e Notificações</h3>
                      <ul className="list-disc list-inside text-sm">
                        <li>Visualizar alertas</li>
                        <li>Gerenciar vencimentos</li>
                        <li>Acompanhar prazos</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Linhas de Conexão (CSS) */}
                <div className="absolute top-24 left-1/4 w-1/2 h-px bg-primary"></div>
                <div className="absolute top-24 left-1/4 w-px h-12 bg-primary"></div>
                <div className="absolute top-24 right-1/4 w-px h-12 bg-primary"></div>
              </div>
            </div>

            {/* Conteúdo existente dos casos de uso */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Coluna dos Atores */}
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Atores</h2>
                
                <div className="flex flex-col items-center p-4 border rounded-lg bg-warm-50">
                  <UserRound size={48} className="text-primary mb-2" />
                  <h3 className="font-semibold">Usuário do Sistema</h3>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Responsável por gerenciar contratos e cadastros
                  </p>
                </div>

                <div className="flex flex-col items-center p-4 border rounded-lg bg-warm-50">
                  <UserRound size={48} className="text-primary mb-2" />
                  <h3 className="font-semibold">Administrador</h3>
                  <p className="text-sm text-gray-600 text-center mt-2">
                    Gerencia usuários e configurações do sistema
                  </p>
                </div>
              </div>

              {/* Coluna dos Casos de Uso */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-semibold mb-4">Casos de Uso</h2>

                {/* Gestão de Contratos */}
                <div className="border rounded-lg p-4 bg-warm-50">
                  <h3 className="text-xl font-semibold mb-4">Gestão de Contratos</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold">UC001 - Cadastrar Novo Contrato</h4>
                      <div className="mt-2 space-y-2 text-sm">
                        <p><strong>Ator:</strong> Usuário do Sistema</p>
                        <p><strong>Pré-condição:</strong> Usuário autenticado</p>
                        <div>
                          <p><strong>Fluxo Principal:</strong></p>
                          <ol className="list-decimal list-inside ml-4">
                            <li>Acessa tela de cadastro</li>
                            <li>Preenche CNPJ/CPF</li>
                            <li>Completa informações</li>
                            <li>Gera contrato</li>
                            <li>Salva contrato</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold">UC002 - Gerenciar Alertas de Contratos</h4>
                      <div className="mt-2 space-y-2 text-sm">
                        <p><strong>Ator:</strong> Usuário do Sistema</p>
                        <p><strong>Pré-condição:</strong> Contratos cadastrados</p>
                        <div>
                          <p><strong>Fluxo Principal:</strong></p>
                          <ol className="list-decimal list-inside ml-4">
                            <li>Visualiza alertas</li>
                            <li>Monitora vencimentos</li>
                            <li>Renova contratos</li>
                            <li>Finaliza contratos</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gestão de Pessoas */}
                <div className="border rounded-lg p-4 bg-warm-50">
                  <h3 className="text-xl font-semibold mb-4">Gestão de Pessoas</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold">UC003 - Cadastrar Pessoa Jurídica</h4>
                      <div className="mt-2 space-y-2 text-sm">
                        <p><strong>Ator:</strong> Usuário do Sistema</p>
                        <p><strong>Pré-condição:</strong> Usuário autenticado</p>
                        <div>
                          <p><strong>Fluxo Principal:</strong></p>
                          <ol className="list-decimal list-inside ml-4">
                            <li>Acessa cadastro</li>
                            <li>Preenche dados</li>
                            <li>Sistema valida</li>
                            <li>Salva cadastro</li>
                          </ol>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold">UC004 - Cadastrar Pessoa Física</h4>
                      <div className="mt-2 space-y-2 text-sm">
                        <p><strong>Ator:</strong> Usuário do Sistema</p>
                        <p><strong>Pré-condição:</strong> Usuário autenticado</p>
                        <div>
                          <p><strong>Fluxo Principal:</strong></p>
                          <ol className="list-decimal list-inside ml-4">
                            <li>Acessa cadastro</li>
                            <li>Preenche dados</li>
                            <li>Sistema valida</li>
                            <li>Salva cadastro</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCases;
