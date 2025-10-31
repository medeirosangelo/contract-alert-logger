import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { UserRound, Users, Shield } from "lucide-react";

const UseCaseDiagram = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main className="p-8 pt-20 lg:pl-72">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold mb-8">Diagrama de Casos de Uso</h1>
          
          <div className="bg-card rounded-lg shadow-lg p-12 border">
            {/* Sistema Boundary */}
            <div className="border-2 border-primary rounded-lg p-8 relative min-h-[700px]">
              <div className="absolute -top-4 left-8 bg-card px-4 py-1">
                <h2 className="font-bold text-lg">Sistema SWGCM</h2>
              </div>

              {/* Grid Layout para Casos de Uso */}
              <div className="grid grid-cols-3 gap-8 mt-8">
                {/* Coluna Esquerda - Administrador */}
                <div className="flex flex-col gap-6 items-end pr-8">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Shield className="w-16 h-16 text-primary" />
                      <span className="text-sm font-semibold">Administrador</span>
                    </div>
                    <div className="w-px h-24 bg-primary/30"></div>
                  </div>
                </div>

                {/* Coluna Central - Casos de Uso */}
                <div className="flex flex-col gap-4">
                  {/* Casos de Uso do Admin */}
                  <div className="bg-primary/5 border-2 border-primary rounded-full px-6 py-3 text-center hover:bg-primary/10 transition-colors">
                    <p className="text-sm font-medium">Gerenciar Usuários</p>
                  </div>
                  
                  <div className="bg-primary/5 border-2 border-primary rounded-full px-6 py-3 text-center hover:bg-primary/10 transition-colors">
                    <p className="text-sm font-medium">Cadastrar Contratos</p>
                  </div>

                  <div className="bg-primary/5 border-2 border-primary rounded-full px-6 py-3 text-center hover:bg-primary/10 transition-colors">
                    <p className="text-sm font-medium">Cadastrar Pessoas</p>
                  </div>

                  <div className="bg-primary/5 border-2 border-primary rounded-full px-6 py-3 text-center hover:bg-primary/10 transition-colors">
                    <p className="text-sm font-medium">Gerenciar Alertas</p>
                  </div>

                  {/* Casos de Uso Compartilhados */}
                  <div className="bg-secondary/5 border-2 border-secondary rounded-full px-6 py-3 text-center hover:bg-secondary/10 transition-colors mt-4">
                    <p className="text-sm font-medium">Visualizar Dashboard</p>
                  </div>

                  <div className="bg-secondary/5 border-2 border-secondary rounded-full px-6 py-3 text-center hover:bg-secondary/10 transition-colors">
                    <p className="text-sm font-medium">Consultar Contratos</p>
                  </div>

                  <div className="bg-secondary/5 border-2 border-secondary rounded-full px-6 py-3 text-center hover:bg-secondary/10 transition-colors">
                    <p className="text-sm font-medium">Gerar Relatórios</p>
                  </div>

                  <div className="bg-secondary/5 border-2 border-secondary rounded-full px-6 py-3 text-center hover:bg-secondary/10 transition-colors">
                    <p className="text-sm font-medium">Visualizar Alertas</p>
                  </div>
                </div>

                {/* Coluna Direita - Gestor/Usuário */}
                <div className="flex flex-col gap-6 items-start pl-8">
                  <div className="flex items-center gap-4">
                    <div className="w-px h-24 bg-secondary/30"></div>
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-16 h-16 text-secondary" />
                      <span className="text-sm font-semibold">Gestor/Usuário</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legenda */}
            <div className="mt-8 bg-muted/50 p-6 rounded-lg border">
              <h3 className="font-semibold mb-4 text-lg">Legenda:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Administrador</p>
                    <p className="text-xs text-muted-foreground">Acesso total ao sistema, pode criar usuários e gerenciar todas as funcionalidades</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-secondary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-sm">Gestor/Usuário</p>
                    <p className="text-xs text-muted-foreground">Acesso a visualização de dados, consultas e relatórios conforme permissões</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-sm mb-2">Permissões por Perfil:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-primary mb-1">Administrador:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Todas as funcionalidades</li>
                      <li>Criar e editar usuários</li>
                      <li>Gerenciar permissões</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-secondary mb-1">Gestor:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Dashboard completo</li>
                      <li>Gerenciar contratos</li>
                      <li>Consultas e relatórios</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-accent mb-1">Colaborador:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Visualizar dashboard</li>
                      <li>Consultar contratos</li>
                      <li>Visualizar alertas</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Nota sobre o Diagrama */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Nota:</strong> Este diagrama representa os principais casos de uso do sistema SWGCM. 
                Os casos de uso em azul (secundário) são compartilhados entre administradores e usuários, 
                enquanto os casos em marrom (primário) são exclusivos de administradores.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCaseDiagram;