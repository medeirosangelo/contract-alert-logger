
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  console.log('Index page rendering', { isAuthenticated, isLoading });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-warm-50 p-4">
        <div className="max-w-3xl text-center">
          <Skeleton className="h-16 w-48 mx-auto mb-6" />
          <Skeleton className="h-10 w-96 mx-auto mb-4" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-14 w-48 mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-warm-50 p-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brown-800 mb-6">SWCI</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-warm-800 mb-4">
          Sistema Web de Controle de Instrumentos
        </h2>
        <p className="text-lg text-warm-700 mb-8">
          Gerencie contratos, pessoas físicas e jurídicas em um único lugar, 
          de forma simples e eficiente.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button className="text-lg px-8 py-6">
                Ir para o Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="text-lg px-8 py-6">
                Entrar no Sistema
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
