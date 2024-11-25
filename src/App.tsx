import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContractRegistration from "./pages/ContractRegistration";
import ContractList from "./pages/ContractList";
import ContractAlerts from "./pages/ContractAlerts";
import ContractTemplate from "./pages/ContractTemplate";
import PhysicalPersonRegistration from "./pages/PhysicalPersonRegistration";
import LegalPersonRegistration from "./pages/LegalPersonRegistration";
import PhysicalPersonList from "./pages/PhysicalPersonList";
import LegalPersonList from "./pages/LegalPersonList";
import PhysicalPersonDetails from "./pages/PhysicalPersonDetails";
import LegalPersonDetails from "./pages/LegalPersonDetails";
import UserPermissions from "./pages/UserPermissions";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/contratos/novo" element={<ContractRegistration />} />
          <Route path="/contratos" element={<ContractList />} />
          <Route path="/contratos/modelo/:id?" element={<ContractTemplate />} />
          <Route path="/contratos/ativos" element={<ContractList />} />
          <Route path="/contratos/finalizados" element={<ContractList />} />
          <Route path="/alertas/contratos" element={<ContractAlerts />} />
          <Route path="/pessoas/fisica/novo" element={<PhysicalPersonRegistration />} />
          <Route path="/pessoas/juridica/novo" element={<LegalPersonRegistration />} />
          <Route path="/pessoas/fisica" element={<PhysicalPersonList />} />
          <Route path="/pessoas/juridica" element={<LegalPersonList />} />
          <Route path="/pessoas/fisica/:id" element={<PhysicalPersonDetails />} />
          <Route path="/pessoas/juridica/:id" element={<LegalPersonDetails />} />
          <Route path="/configuracoes/usuarios" element={<UserPermissions />} />
          <Route path="/ajuda/documentacao" element={<Documentation />} />
          <Route path="/ajuda/suporte" element={<Support />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;