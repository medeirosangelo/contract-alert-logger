import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { UserRound } from "lucide-react";

const UseCaseActors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="p-8 pt-20 lg:pl-72">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Atores do Sistema</h1>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserRound className="w-8 h-8 text-primary" />
                <h2 className="text-xl font-semibold">Administrador</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Ator responsável pela gestão completa do sistema, com acesso a todas as funcionalidades.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Gerenciar contratos</li>
                <li>Gerenciar pessoas (físicas e jurídicas)</li>
                <li>Visualizar e gerenciar alertas</li>
                <li>Criar e editar contratos</li>
                <li>Configurar preferências do sistema</li>
                <li>Gerenciar usuários e permissões</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserRound className="w-8 h-8 text-secondary" />
                <h2 className="text-xl font-semibold">Usuário</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Ator com acesso às funcionalidades básicas do sistema para operações diárias.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Visualizar contratos</li>
                <li>Cadastrar pessoas físicas e jurídicas</li>
                <li>Visualizar alertas de contratos</li>
                <li>Criar novos contratos</li>
                <li>Editar contratos existentes</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCaseActors;