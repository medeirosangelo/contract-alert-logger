import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UseCases = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold mb-8">Casos de Uso do Sistema</h1>

            <Tabs defaultValue="contracts">
              <TabsList className="mb-6">
                <TabsTrigger value="contracts">Contratos</TabsTrigger>
                <TabsTrigger value="persons">Pessoas</TabsTrigger>
                <TabsTrigger value="alerts">Alertas</TabsTrigger>
              </TabsList>

              <TabsContent value="contracts" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">UC001 - Cadastrar Novo Contrato</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Ator Principal</h3>
                      <p className="text-gray-600">Usuário do Sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Pré-condições</h3>
                      <p className="text-gray-600">Usuário autenticado no sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Fluxo Principal</h3>
                      <ol className="list-decimal list-inside text-gray-600 space-y-1">
                        <li>Usuário acessa a tela de cadastro de contratos</li>
                        <li>Sistema apresenta formulário de cadastro</li>
                        <li>Usuário preenche CNPJ/CPF da parte contratada</li>
                        <li>Sistema auto-preenche dados cadastrais</li>
                        <li>Usuário completa demais informações do contrato</li>
                        <li>Usuário clica em "Gerar Contrato"</li>
                        <li>Sistema gera PDF do contrato</li>
                        <li>Usuário salva o contrato</li>
                      </ol>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">UC002 - Gerenciar Alertas de Contratos</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Ator Principal</h3>
                      <p className="text-gray-600">Usuário do Sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Pré-condições</h3>
                      <p className="text-gray-600">Contratos cadastrados no sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Fluxo Principal</h3>
                      <ol className="list-decimal list-inside text-gray-600 space-y-1">
                        <li>Sistema monitora datas de vencimento</li>
                        <li>Sistema exibe alertas de contratos próximos ao vencimento</li>
                        <li>Usuário visualiza lista de alertas</li>
                        <li>Usuário pode renovar ou finalizar contratos</li>
                      </ol>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="persons" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">UC003 - Cadastrar Pessoa Jurídica</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Ator Principal</h3>
                      <p className="text-gray-600">Usuário do Sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Pré-condições</h3>
                      <p className="text-gray-600">Usuário autenticado</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Fluxo Principal</h3>
                      <ol className="list-decimal list-inside text-gray-600 space-y-1">
                        <li>Usuário acessa cadastro de pessoa jurídica</li>
                        <li>Preenche dados da empresa</li>
                        <li>Sistema valida informações</li>
                        <li>Sistema salva cadastro</li>
                      </ol>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">UC004 - Cadastrar Pessoa Física</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Ator Principal</h3>
                      <p className="text-gray-600">Usuário do Sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Pré-condições</h3>
                      <p className="text-gray-600">Usuário autenticado</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Fluxo Principal</h3>
                      <ol className="list-decimal list-inside text-gray-600 space-y-1">
                        <li>Usuário acessa cadastro de pessoa física</li>
                        <li>Preenche dados pessoais</li>
                        <li>Sistema valida informações</li>
                        <li>Sistema salva cadastro</li>
                      </ol>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">UC005 - Gerenciar Alertas</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Ator Principal</h3>
                      <p className="text-gray-600">Sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Pré-condições</h3>
                      <p className="text-gray-600">Contratos ativos no sistema</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Fluxo Principal</h3>
                      <ol className="list-decimal list-inside text-gray-600 space-y-1">
                        <li>Sistema verifica diariamente os contratos</li>
                        <li>Sistema identifica contratos próximos ao vencimento</li>
                        <li>Sistema gera alertas automáticos</li>
                        <li>Sistema notifica usuários responsáveis</li>
                      </ol>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCases;