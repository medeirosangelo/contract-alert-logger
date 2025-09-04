import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentation = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold mb-8">Documentação Técnica</h1>

            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">SWGCM - Sistema Web para Gestão de Contratos e Monitoramento</h2>
                  <p className="text-gray-600 mb-4">
                    O SWGCM é um sistema web desenvolvido para gestão integrada de contratos e monitoramento da produtividade, 
                    oferecendo funcionalidades automatizadas para apoiar a tomada de decisões estratégicas.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Principais Funcionalidades</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Alertas automatizados para contratos próximos ao vencimento</li>
                    <li>Dashboards interativos para visualização de contratos e produtividade</li>
                    <li>Interfaces responsivas para cadastro e acompanhamento de contratos</li>
                    <li>Relatórios detalhados sobre status contratual</li>
                    <li>Processo de renovação contratual automatizado</li>
                    <li>Sistema de busca e filtros avançados</li>
                    <li>Autenticação e autorização baseados em papéis (RBAC)</li>
                    <li>Gestão de Pessoas Físicas e Jurídicas</li>
                    <li>Geração de Documentos em PDF</li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="frontend" className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Tecnologias Frontend</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>React com TypeScript</li>
                    <li>Vite como bundler</li>
                    <li>Tailwind CSS para estilização</li>
                    <li>shadcn/ui para componentes</li>
                    <li>Tanstack Query para estado</li>
                    <li>Recharts para gráficos</li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="backend" className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Tecnologias Backend</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Supabase (Backend-as-a-Service)</li>
                    <li>PostgreSQL com Row Level Security (RLS)</li>
                    <li>Supabase Auth para autenticação JWT</li>
                    <li>Edge Functions (Deno) para lógica serverless</li>
                    <li>APIs REST automáticas</li>
                    <li>Triggers e functions personalizadas</li>
                    <li>Políticas de segurança granulares</li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Arquitetura e Segurança</h2>
                  <div className="space-y-4">
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">Autenticação JWT</h3>
                      <p className="text-gray-600">Sistema de autenticação seguro com refresh tokens automáticos e sessões persistentes</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">Row Level Security (RLS)</h3>
                      <p className="text-gray-600">Controle de acesso baseado em papéis implementado diretamente no banco de dados</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">APIs REST Automáticas</h3>
                      <p className="text-gray-600">Endpoints gerados automaticamente pelo Supabase baseados no schema do banco</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">Edge Functions</h3>
                      <p className="text-gray-600">Funções serverless em Deno para lógica de negócio customizada</p>
                    </div>
                  </div>
                </section>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Documentation;