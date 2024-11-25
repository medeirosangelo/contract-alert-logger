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

const UserPermissions = () => {
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      role: "admin",
      permissions: {
        dashboard: true,
        contracts: true,
        users: true,
        edit: true,
      },
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@example.com",
      role: "editor",
      permissions: {
        dashboard: true,
        contracts: true,
        users: false,
        edit: true,
      },
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro@example.com",
      role: "viewer",
      permissions: {
        dashboard: true,
        contracts: true,
        users: false,
        edit: false,
      },
    },
  ];

  const handlePermissionChange = (userId: number, permission: string) => {
    toast({
      title: "Permissão atualizada",
      description: "As alterações foram salvas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Usuários e Permissões</h2>
            
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
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell className="capitalize">{user.role}</TableCell>
                    <TableCell>
                      <Switch
                        checked={user.permissions.dashboard}
                        onCheckedChange={() => handlePermissionChange(user.id, "dashboard")}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={user.permissions.contracts}
                        onCheckedChange={() => handlePermissionChange(user.id, "contracts")}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={user.permissions.users}
                        onCheckedChange={() => handlePermissionChange(user.id, "users")}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={user.permissions.edit}
                        onCheckedChange={() => handlePermissionChange(user.id, "edit")}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserPermissions;