
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContractList from "./pages/ContractList";
import ContractRegistration from "./pages/ContractRegistration";
import ContractAlerts from './pages/ContractAlerts';
import PhysicalPersonList from './pages/PhysicalPersonList';
import PhysicalPersonDetails from './pages/PhysicalPersonDetails';
import PhysicalPersonRegistration from './pages/PhysicalPersonRegistration';
import LegalPersonList from './pages/LegalPersonList';
import LegalPersonDetails from './pages/LegalPersonDetails';
import LegalPersonRegistration from './pages/LegalPersonRegistration';
import UserPermissions from './pages/UserPermissions';
import UserManagement from './pages/UserManagement';
import Documentation from './pages/Documentation';
import Support from './pages/Support';
import ContractTemplate from './pages/ContractTemplate';
import AdminUserCreation from './pages/AdminUserCreation';
import TCC from './pages/TCC';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from "sonner";
import UseCases from './pages/UseCases';
import UseCaseDiagram from './pages/UseCaseDiagram';
import UseCaseActors from './pages/UseCaseActors';
import ClassDiagram from './pages/ClassDiagram';
import DigitalSignatureDemo from './pages/DigitalSignatureDemo';

import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* Rotas protegidas */}
            <Route element={<ProtectedRoute />}>
              {/* Início - Dashboard principal */}
              <Route path="/home" element={<Dashboard />} />
              
              {/* Rotas de Contratos */}
              <Route path="/contracts" element={<ContractList />} />
              <Route path="/contracts/ativos" element={<ContractList />} />
              <Route path="/contracts/finalizados" element={<ContractList />} />
              <Route path="/contracts/new" element={<ContractRegistration />} />
              <Route path="/contract-template" element={<ContractTemplate />} />
              <Route path="/alerts/contracts" element={<ContractAlerts />} />
              <Route path="/digital-signature-demo" element={<DigitalSignatureDemo />} />
              
              {/* Rotas de Pessoas */}
              <Route path="/physical-persons" element={<PhysicalPersonList />} />
              <Route path="/physical-persons/:id" element={<PhysicalPersonDetails />} />
              <Route path="/physical-persons/new" element={<PhysicalPersonRegistration />} />
              <Route path="/legal-persons" element={<LegalPersonList />} />
              <Route path="/legal-persons/:id" element={<LegalPersonDetails />} />
              <Route path="/legal-persons/new" element={<LegalPersonRegistration />} />
              
              {/* Rotas de UML */}
              <Route path="/uml/casos-de-uso" element={<UseCases />} />
              <Route path="/uml/atores" element={<UseCaseActors />} />
              <Route path="/uml/diagrama-classes" element={<ClassDiagram />} />
              <Route path="/uml/diagrama-casos-de-uso" element={<UseCaseDiagram />} />
              
              {/* Rotas de Configurações */}
              <Route path="/users/permissions" element={<UserPermissions />} />
              <Route path="/users/management" element={<UserManagement />} />
              <Route path="/settings" element={<Documentation />} />
              
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/support" element={<Support />} />
              <Route path="/admin-users" element={<AdminUserCreation />} />
              
              {/* Redirecionamentos */}
              <Route path="/dashboard" element={<Navigate to="/home" replace />} />
              <Route path="/alerts" element={<Navigate to="/alerts/contracts" replace />} />
              <Route path="/uml" element={<Navigate to="/uml/casos-de-uso" replace />} />
              <Route path="/users" element={<Navigate to="/users/management" replace />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
            
            {/* Página TCC (não protegida) */}
            <Route path="/tcc" element={<TCC />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
