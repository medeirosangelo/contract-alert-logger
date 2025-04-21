
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "@/services/users";
import { Badge } from "@/components/ui/badge";
import { User } from "@/services/types";
import { Json } from "@/integrations/supabase/types";

// Define interface for permission object
interface UserPermissions {
  dashboard: boolean;
  contracts: boolean;
  users: boolean;
  edit: boolean;
}

const UserPermissions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Consultar a lista de usuários
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAll,
  });

  // Mutation para atualizar permissões
  const updatePermissionMutation = useMutation({
    mutationFn: ({ userId, permissions }: { userId: string, permissions: Record<string, boolean> }) =>
      userApi.updatePermissions(userId, permissions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Permissão atualizada",
        description: "As alterações foram salvas com sucesso.",
      });
    },
  });

  // Tradução do papel do usuário
  const translateRole = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador";
      case "gestor":
        return "Gestor";
      case "colaborador":
        return "Colaborador";
      default:
        return role;
    }
  };

  const handlePermissionChange = (userId: string, permission: string, currentValue: boolean) => {
    // Encontrar o usuário
    const user = users?.find(u => u.id === userId);
    if (!user) return;
    
    // Obter permissões atuais ou criar objeto padrão
    const defaultPermissions: UserPermissions = {
      dashboard: true,
      contracts: user.role !== "colaborador",
      users: user.role === "admin",
      edit: user.role !== "colaborador"
    };
    
    // Converter permissions de Json para objeto ou usar padrão
    let currentPermissions: UserPermissions;
    
    if (user.permissions && typeof user.permissions === 'object' && user.permissions !== null) {
      // Assegurar que todas as propriedades existem no objeto
      const permObj = user.permissions as Record<string, boolean>;
      currentPermissions = {
        dashboard: 'dashboard' in permObj ? Boolean(permObj.dashboard) : defaultPermissions.dashboard,
        contracts: 'contracts' in permObj ? Boolean(permObj.contracts) : defaultPermissions.contracts,
        users: 'users' in permObj ? Boolean(permObj.users) : defaultPermissions.users,
        edit: 'edit' in permObj ? Boolean(permObj.edit) : defaultPermissions.edit
      };
    } else {
      currentPermissions = { ...defaultPermissions };
    }
    
    // Atualizar permissão específica
    const updatedPermissions = {
      ...currentPermissions,
      [permission]: !currentValue
    };
    
    // Chamar a mutation para atualizar
    updatePermissionMutation.mutate({
      userId,
      permissions: updatedPermissions
    });
  };

  // Função para obter o valor atual da permissão
  const getPermissionValue = (user: User, permission: string): boolean => {
    // Valores padrão caso não exista
    const defaults: UserPermissions = {
      dashboard: true,
      contracts: user.role !== "colaborador",
      users: user.role === "admin",
      edit: user.role !== "colaborador"
    };
    
    // Verificar se permissions existe e é um objeto
    if (user.permissions && typeof user.permissions === 'object' && user.permissions !== null) {
      const permissionsObj = user.permissions as Record<string, any>;
      // Verificar se a propriedade específica existe no objeto de permissões
      if (permission in permissionsObj) {
        return Boolean(permissionsObj[permission]);
      }
    }
    
    // Retornar valor padrão se não encontrar a permissão
    return defaults[permission as keyof UserPermissions];
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Usuários e Permissões</h2>
            
            {isLoading ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Carregando permissões...</span>
              </div>
            ) : isError ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                  Não foi possível carregar as permissões dos usuários.
                </AlertDescription>
              </Alert>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Dashboard</TableHead>
                    <TableHead>Contratos</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead>Edição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "destructive" : user.role === "gestor" ? "default" : "secondary"}>
                          {translateRole(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={getPermissionValue(user, "dashboard")}
                          onCheckedChange={() => handlePermissionChange(
                            user.id, 
                            "dashboard", 
                            getPermissionValue(user, "dashboard")
                          )}
                          disabled={user.role === "admin"} // Admin sempre tem todas as permissões
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={getPermissionValue(user, "contracts")}
                          onCheckedChange={() => handlePermissionChange(
                            user.id, 
                            "contracts", 
                            getPermissionValue(user, "contracts")
                          )}
                          disabled={user.role === "admin"}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={getPermissionValue(user, "users")}
                          onCheckedChange={() => handlePermissionChange(
                            user.id, 
                            "users", 
                            getPermissionValue(user, "users")
                          )}
                          disabled={user.role === "admin"}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={getPermissionValue(user, "edit")}
                          onCheckedChange={() => handlePermissionChange(
                            user.id, 
                            "edit", 
                            getPermissionValue(user, "edit")
                          )}
                          disabled={user.role === "admin"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPermissions;
