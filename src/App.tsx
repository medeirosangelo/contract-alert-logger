
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Documentation from './pages/Documentation';
import Support from './pages/Support';
import ContractTemplate from './pages/ContractTemplate';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from './hooks/useAuth';
import { Toaster as SonnerToaster } from "sonner";

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
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contracts" element={<ContractList />} />
              <Route path="/contracts/new" element={<ContractRegistration />} />
              <Route path="/alerts/contracts" element={<ContractAlerts />} />
              <Route path="/physical-persons" element={<PhysicalPersonList />} />
              <Route path="/physical-persons/:id" element={<PhysicalPersonDetails />} />
              <Route path="/physical-persons/new" element={<PhysicalPersonRegistration />} />
              <Route path="/legal-persons" element={<LegalPersonList />} />
              <Route path="/legal-persons/:id" element={<LegalPersonDetails />} />
              <Route path="/legal-persons/new" element={<LegalPersonRegistration />} />
              <Route path="/user-permissions" element={<UserPermissions />} />
              <Route path="/contract-template" element={<ContractTemplate />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/support" element={<Support />} />
            </Route>
          </Routes>
          <SonnerToaster />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
