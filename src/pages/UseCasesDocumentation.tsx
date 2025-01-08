import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UseCasesDocumentation = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold mb-8">Documentação dos Casos de Uso</h1>

            <Tabs defaultValue="contracts" className="space-y-4">
              <TabsList>
                <TabsTrigger value="contracts">Contratos</TabsTrigger>
                <TabsTrigger value="people">Pessoas</TabsTrigger>
                <TabsTrigger value="alerts">Alertas</TabsTrigger>
              </TabsList>

              <TabsContent value="contracts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>UC001 - Cadastrar Novo Contrato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Ator Principal:</strong> Usuário do Sistema</p>
                    <p><strong>Pré-condições:</strong> Usuário autenticado no sistema</p>
                    <p><strong>Fluxo Principal:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Usuário acessa a tela de cadastro de contratos</li>
                      <li>Sistema apresenta formulário de cadastro</li>
                      <li>Usuário preenche CNPJ/CPF da parte contratada</li>
                      <li>Sistema auto-preenche dados cadastrais</li>
                      <li>Usuário completa demais informações do contrato</li>
                      <li>Usuário clica em "Gerar Contrato"</li>
                      <li>Sistema gera PDF do contrato</li>
                      <li>Usuário salva o contrato</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>UC002 - Gerenciar Alertas de Contratos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Ator Principal:</strong> Usuário do Sistema</p>
                    <p><strong>Pré-condições:</strong> Contratos cadastrados no sistema</p>
                    <p><strong>Fluxo Principal:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Sistema monitora datas de vencimento</li>
                      <li>Sistema exibe alertas de contratos próximos ao vencimento</li>
                      <li>Usuário visualiza lista de alertas</li>
                      <li>Usuário pode renovar ou finalizar contratos</li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="people" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>UC003 - Cadastrar Pessoa Jurídica</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Ator Principal:</strong> Usuário do Sistema</p>
                    <p><strong>Pré-condições:</strong> Usuário autenticado</p>
                    <p><strong>Fluxo Principal:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Usuário acessa cadastro de pessoa jurídica</li>
                      <li>Preenche dados da empresa</li>
                      <li>Sistema valida informações</li>
                      <li>Sistema salva cadastro</li>
                    </ol>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>UC004 - Cadastrar Pessoa Física</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Ator Principal:</strong> Usuário do Sistema</p>
                    <p><strong>Pré-condições:</strong> Usuário autenticado</p>
                    <p><strong>Fluxo Principal:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Usuário acessa cadastro de pessoa física</li>
                      <li>Preenche dados pessoais</li>
                      <li>Sistema valida informações</li>
                      <li>Sistema salva cadastro</li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>UC005 - Gerenciar Alertas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p><strong>Ator Principal:</strong> Sistema</p>
                    <p><strong>Pré-condições:</strong> Contratos ativos no sistema</p>
                    <p><strong>Fluxo Principal:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                      <li>Sistema verifica diariamente os contratos</li>
                      <li>Sistema identifica contratos próximos ao vencimento</li>
                      <li>Sistema gera alertas para os usuários</li>
                      <li>Sistema notifica os usuários responsáveis</li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCasesDocumentation;