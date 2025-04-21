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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi, UserCreateRequest } from "@/services/users";
import { Pencil, Trash2, UserPlus, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

const userFormSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  role: z.enum(["admin", "gestor", "colaborador"], {
    required_error: "Selecione um perfil para o usuário",
  }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const UserManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { role } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.getAll,
  });

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "colaborador",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: (userData: UserCreateRequest) => userApi.create(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      form.reset();
      setIsDialogOpen(false);
    },
  });
  
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => userApi.delete(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({
        title: "Usuário removido",
        description: "O usuário foi removido com sucesso.",
      });
    },
  });

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  const onSubmit = (data: UserFormValues) => {
    const userData: UserCreateRequest = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role
    };
    
    createUserMutation.mutate(userData);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "gestor":
        return "default";
      case "colaborador":
        return "secondary";
      default:
        return "outline";
    }
  };

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

  const isAdmin = role === "admin";

  // Adicionar exemplo de consulta de histórico rápido
  // Supondo que empresas estão em legal_persons, buscamos contratos antigos relacionados

  // Função para buscar histórico, pode ser aplicada no form ao buscar CNPJ ou no perfil da empresa
  const checkCompanyHistory = async (cnpj: string) => {
    const { data, error } = await supabase
      .from('legal_persons')
      .select('id, company_name')
      .eq('cnpj', cnpj);

    if (data && data.length > 0) {
      // Busca contratos antigos relacionados
      const companyId = data[0].id;
      const { data: contracts } = await supabase
        .from('contracts')
        .select('id, start_date, end_date, status')
        .or(`contractor_id.eq.${companyId},contracted_id.eq.${companyId}`);
      
      if (contracts && contracts.length > 0) {
        toast({
          title: "Histórico encontrado",
          description: `Esta empresa já participou de ${contracts.length} contrato(s) na instituição.`,
        });
        return contracts;
      } else {
        toast({
          title: "Nenhum histórico",
          description: "Esta empresa não possui contratos anteriores.",
        });
        return [];
      }
    }
    toast({
      title: "Empresa não encontrada",
      description: "CNPJ não consta no cadastro.",
      variant: "destructive",
    });
    return [];
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Gerenciamento de Usuários</h2>
            {isAdmin && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Novo Usuário
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Usuário</DialogTitle>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Nome do usuário" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="exemplo@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormDescription>
                              Mínimo de 6 caracteres
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Perfil de Acesso</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione um perfil" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="admin">Administrador</SelectItem>
                                <SelectItem value="gestor">Gestor</SelectItem>
                                <SelectItem value="colaborador">Colaborador</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              O perfil determina quais funcionalidades o usuário terá acesso
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full"
                        disabled={createUserMutation.isPending}
                      >
                        {createUserMutation.isPending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Criar Usuário
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Carregando usuários...</span>
            </div>
          ) : isError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>
                Não foi possível carregar a lista de usuários.
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Usuários do Sistema</CardTitle>
                <CardDescription>
                  Gerenciamento de contas e permissões de acesso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users && users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={getRoleBadgeVariant(user.role)}>
                              {translateRole(user.role)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Editar"
                                disabled={!isAdmin}
                                onClick={() => toast({
                                  title: "Em desenvolvimento",
                                  description: "Funcionalidade de edição será implementada em breve."
                                })}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Excluir"
                                disabled={!isAdmin}
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                          Nenhum usuário cadastrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
