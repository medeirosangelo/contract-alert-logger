
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  // Dados de login
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isUsernameLogin, setIsUsernameLogin] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log('Login page rendering', { isAuthenticated, isLoading });

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log('Usuário autenticado, redirecionando para dashboard');
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    
    if (!loginIdentifier || !loginPassword) {
      setErrorMessage("Por favor, preencha todos os campos.");
      setShowError(true);
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Tentando login com:', loginIdentifier, 'Modo username:', isUsernameLogin);
      await login(loginIdentifier, loginPassword, isUsernameLogin);
      console.log('Login bem-sucedido, redirecionando para dashboard');
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro de login:", error);
      setErrorMessage("Verifique suas credenciais e tente novamente.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-warm-50">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-2/3 mx-auto" />
          <p className="text-center text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-warm-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-brown-800">SWGCM</h1>
          <p className="text-warm-700">Sistema Web para Gestão de Contratos e Monitoramento</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {showError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Erro ao fazer login</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="login-mode">Usar nome de usuário</Label>
                <Switch 
                  id="login-mode"
                  checked={isUsernameLogin}
                  onCheckedChange={setIsUsernameLogin}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="identifier">
                  {isUsernameLogin ? "Nome de usuário" : "E-mail"}
                </Label>
                <Input
                  id="identifier"
                  type={isUsernameLogin ? "text" : "email"}
                  placeholder={isUsernameLogin ? "seu.usuario" : "seu@email.com"}
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>

          <div className="px-6 pb-6 pt-2">
            <p className="text-center text-sm text-muted-foreground">
              Cadastro desabilitado temporariamente.
              <br />
              Entre em contato com um administrador para acesso ao sistema.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
