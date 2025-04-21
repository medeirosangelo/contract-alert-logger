import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { ArrowRight, FileText, Users, LayoutDashboard } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  console.log('Index page rendering', { isAuthenticated, isLoading });

  useEffect(() => {
    // Se já estiver autenticado e não estiver carregando, NÃO redireciona para o dashboard
    // Removido redirecionamento automático para que a página inicial seja mostrada sempre
  }, [isAuthenticated, isLoading, navigate]);

  // Se estiver carregando, mostra o skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-warm-50 p-4">
        <div className="max-w-3xl text-center">
          <Skeleton className="h-16 w-48 mx-auto mb-6" />
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-14 w-48 mx-auto" />
          <p className="mt-4 text-gray-500">Carregando...</p>
        </div>
      </div>
    );
  }

  // Sempre mostra a página inicial, independentemente do status de autenticação
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-warm-50 to-warm-100 p-4">
      <div className="max-w-4xl text-center">
        <div className="mb-6">
          <img src="/public/lovable-uploads/7824ebc6-3fac-4a10-b500-45269e9f48de.png" className="mx-auto w-44 mb-2" alt="Inspire logo" />
          <h2 className="text-xl font-semibold text-primary mb-2">
            Bem-vindo(a) ao Sistema SWCI!
          </h2>
          <span className="block text-primary">
            Aqui você acompanha o histórico completo de empresas e colaboradores, garantindo transparência e controle sobre contratos prestados à instituição.
          </span>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md border border-warm-200 hover:shadow-lg transition-shadow">
            <div className="bg-warm-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-warm-800 mb-2">Gestão de Contratos</h3>
            <p className="text-warm-600">Controle todos os seus contratos, com alertas de vencimento e histórico completo.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-warm-200 hover:shadow-lg transition-shadow">
            <div className="bg-warm-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-warm-800 mb-2">Cadastro Centralizado</h3>
            <p className="text-warm-600">Mantenha informações de pessoas físicas e jurídicas organizadas e acessíveis.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-warm-200 hover:shadow-lg transition-shadow">
            <div className="bg-warm-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-warm-800 mb-2">Dashboard Intuitivo</h3>
            <p className="text-warm-600">Visualize indicadores importantes e tome decisões baseadas em dados.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <div className="space-x-4">
              <Link to="/dashboard">
                <Button className="text-lg px-6 py-6 group bg-primary hover:bg-primary-dark transition-all">
                  Ir para o Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <Button className="text-lg px-6 py-6 group bg-primary hover:bg-primary-dark transition-all">
                Entrar no Sistema
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </div>
        
        <p className="text-warm-600 mt-12 text-sm">
          © {new Date().getFullYear()} SWCI - Sistema Web de Controle de Instrumentos. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Index;
