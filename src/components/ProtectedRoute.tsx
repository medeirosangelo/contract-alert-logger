
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";

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
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-12 w-2/3 mx-auto" />
          <p className="text-center text-gray-500">Carregando...</p>
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
