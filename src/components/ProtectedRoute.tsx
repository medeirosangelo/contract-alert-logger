
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";
import React from "react";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, role } = useAuth();

  console.log('ProtectedRoute rendering:', { isAuthenticated, isLoading, role, allowedRoles });

  // Mostra estado de carregamento enquanto verifica a autenticação
  if (isLoading) {
    console.log('ProtectedRoute: Loading state');
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-warm-50 p-4">
        <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md border border-warm-200 animate-fadeIn">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <h2 className="text-xl font-semibold text-warm-800">Carregando...</h2>
          </div>
          
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
            </div>
            <Skeleton className="h-32 w-full rounded-md" />
            <Skeleton className="h-10 w-1/2 mx-auto rounded-md" />
          </div>
          
          <p className="text-center text-warm-500 text-sm mt-4">
            Verificando suas credenciais e preparando o sistema...
          </p>
        </div>
      </div>
    );
  }

  // Redireciona para login se não estiver autenticado
  if (!isAuthenticated) {
    console.log('Usuário não autenticado, redirecionando para login');
    return <Navigate to="/login" replace />;
  }

  // Verifica acesso baseado em papel/função
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    console.log('Usuário não autorizado, redirecionando para não autorizado', { role, allowedRoles });
    return <Navigate to="/unauthorized" replace />;
  }

  // Se autenticado e autorizado, renderiza as rotas filhas
  console.log('Usuário autenticado e autorizado, renderizando rotas filhas');
  return <Outlet />;
};

export default ProtectedRoute;
