import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", credentials);
    
    // Mock authentication - in real app this would call the backend
    if (credentials.email && credentials.password) {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao Sistema de Controle Interno",
      });
      navigate("/");
    } else {
      toast({
        title: "Erro no login",
        description: "Por favor, verifique suas credenciais",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-warm-900">SWCI</h1>
        <p className="text-center text-warm-600 mb-8">Sistema Web de Controle Interno</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-warm-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              placeholder="seu@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-warm-700">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;