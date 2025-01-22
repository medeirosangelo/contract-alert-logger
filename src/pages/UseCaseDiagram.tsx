import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { UserRound, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const UseCaseDiagram = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Header />
      <main className="p-8 pt-20 lg:pl-72">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Diagrama de Casos de Uso</h1>
          
          <div className="relative bg-white p-8 rounded-lg shadow-lg min-h-[600px] overflow-x-auto">
            {/* Actors */}
            <div className="absolute left-10 top-1/4">
              <div className="flex flex-col items-center gap-2">
                <UserRound className="w-12 h-12 text-primary" />
                <span className="text-sm font-medium">Administrador</span>
              </div>
            </div>

            <div className="absolute left-10 bottom-1/4">
              <div className="flex flex-col items-center gap-2">
                <Users className="w-12 h-12 text-secondary" />
                <span className="text-sm font-medium">Usuário</span>
              </div>
            </div>

            {/* Use Cases */}
            <div className="ml-32 grid gap-4 relative">
              {/* Connecting lines using SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Lines from Admin to Use Cases */}
                <line x1="20" y1="25%" x2="200" y2="10%" stroke="#FF8A65" strokeWidth="1" />
                <line x1="20" y1="25%" x2="200" y2="25%" stroke="#FF8A65" strokeWidth="1" />
                <line x1="20" y1="25%" x2="200" y2="40%" stroke="#FF8A65" strokeWidth="1" />
                <line x1="20" y1="25%" x2="200" y2="55%" stroke="#FF8A65" strokeWidth="1" />
                
                {/* Lines from User to Use Cases */}
                <line x1="20" y1="75%" x2="200" y2="40%" stroke="#FF8A65" strokeWidth="1" />
                <line x1="20" y1="75%" x2="200" y2="55%" stroke="#FF8A65" strokeWidth="1" />
                <line x1="20" y1="75%" x2="200" y2="70%" stroke="#FF8A65" strokeWidth="1" />
                <line x1="20" y1="75%" x2="200" y2="85%" stroke="#FF8A65" strokeWidth="1" />
              </svg>

              {/* Use Case Cards */}
              <Card className="p-4 w-64 text-center bg-warm-50 border-primary">
                <p>Gerenciar Usuários e Permissões</p>
              </Card>

              <Card className="p-4 w-64 text-center bg-warm-50 border-primary">
                <p>Configurar Sistema</p>
              </Card>

              <Card className="p-4 w-64 text-center bg-warm-50 border-primary">
                <p>Gerenciar Contratos</p>
              </Card>

              <Card className="p-4 w-64 text-center bg-warm-50 border-primary">
                <p>Gerenciar Pessoas</p>
              </Card>

              <Card className="p-4 w-64 text-center bg-warm-50 border-primary">
                <p>Visualizar Alertas</p>
              </Card>

              <Card className="p-4 w-64 text-center bg-warm-50 border-primary">
                <p>Gerar Relatórios</p>
              </Card>

              <Card className="p-4 w-64 text-center bg-warm-50 border-primary">
                <p>Cadastrar Contratos</p>
              </Card>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-warm-50 p-4 rounded-lg border border-warm-200">
              <h3 className="font-semibold mb-2">Legenda:</h3>
              <div className="flex items-center gap-2">
                <UserRound className="w-4 h-4 text-primary" />
                <span className="text-sm">Administrador - Acesso total ao sistema</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <span className="text-sm">Usuário - Acesso limitado às funcionalidades básicas</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCaseDiagram;