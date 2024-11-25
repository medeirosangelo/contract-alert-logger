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
                  <h2 className="text-2xl font-semibold mb-4">SWCI - Sistema Web de Controle Interno</h2>
                  <p className="text-gray-600 mb-4">
                    O SWCI é um sistema web desenvolvido para gerenciar contratos, pessoas físicas e jurídicas,
                    com funcionalidades de alertas e geração de documentos.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3">Principais Funcionalidades</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Gestão de Contratos</li>
                    <li>Cadastro de Pessoas Físicas e Jurídicas</li>
                    <li>Sistema de Alertas</li>
                    <li>Geração de Documentos</li>
                    <li>Dashboard Analítico</li>
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
                    <li>Django REST Framework</li>
                    <li>PostgreSQL</li>
                    <li>WebSocket para atualizações em tempo real</li>
                    <li>Celery para tarefas assíncronas</li>
                  </ul>
                </section>
              </TabsContent>

              <TabsContent value="api" className="space-y-6">
                <section>
                  <h2 className="text-2xl font-semibold mb-4">Documentação da API</h2>
                  <div className="space-y-4">
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">GET /api/contracts</h3>
                      <p className="text-gray-600">Lista todos os contratos</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">POST /api/contracts</h3>
                      <p className="text-gray-600">Cria um novo contrato</p>
                    </div>
                    <div className="p-4 border rounded">
                      <h3 className="font-semibold mb-2">GET /api/persons</h3>
                      <p className="text-gray-600">Lista todas as pessoas</p>
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