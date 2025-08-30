import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, CheckCircle } from "lucide-react";

const AdminUserCreation = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "colaborador"
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: formData
      });

      if (error) {
        throw error;
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      setSuccess(true);
      setFormData({
        email: "",
        password: "",
        name: "",
        role: "colaborador"
      });

      toast({
        title: "Usuário criado com sucesso!",
        description: `${formData.name} foi adicionado ao sistema.`,
      });

    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      setError('Erro ao criar usuário. Tente novamente.');
      toast({
        title: "Erro ao criar usuário",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createPredefinedUsers = async () => {
    const users = [
      {
        email: "geovanna@tcc.com",
        password: "geovanna123",
        name: "Geovanna",
        role: "gestor"
      },
      {
        email: "vitoria@tcc.com", 
        password: "vitoria123",
        name: "Vitória",
        role: "gestor"
      }
    ];

    setIsLoading(true);
    let successCount = 0;

    for (const user of users) {
      try {
        const { data, error } = await supabase.functions.invoke('create-user', {
          body: user
        });

        if (!error && !data?.error) {
          successCount++;
        }
      } catch (error) {
        console.error(`Erro ao criar ${user.name}:`, error);
      }
    }

    setIsLoading(false);
    
    if (successCount > 0) {
      toast({
        title: `${successCount} usuário(s) criado(s)`,
        description: "Geovanna e/ou Vitória foram adicionadas ao sistema.",
      });
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brown-800">Criação de Usuários - Admin</h1>
          <p className="text-warm-700 mt-2">Interface temporária para criar usuários do TCC</p>
        </div>

        {/* Botão rápido para criar Geovanna e Vitória */}
        <Card>
          <CardHeader>
            <CardTitle>Criação Rápida - TCC</CardTitle>
            <CardDescription>
              Criar rapidamente os usuários Geovanna e Vitória para apresentação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createPredefinedUsers} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Criando..." : "Criar Geovanna e Vitória"}
            </Button>
          </CardContent>
        </Card>

        {/* Formulário manual */}
        <Card>
          <CardHeader>
            <CardTitle>Criar Usuário Manualmente</CardTitle>
            <CardDescription>
              Preencha os dados para criar um novo usuário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Usuário criado com sucesso!</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Papel</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="gestor">Gestor</SelectItem>
                    <SelectItem value="colaborador">Colaborador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Criando..." : "Criar Usuário"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-warm-600">
          <p>🔐 Credenciais criadas:</p>
          <p><strong>Geovanna:</strong> geovanna@tcc.com / geovanna123</p>
          <p><strong>Vitória:</strong> vitoria@tcc.com / vitoria123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminUserCreation;