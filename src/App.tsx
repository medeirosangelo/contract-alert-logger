
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ContractList from "@/pages/ContractList";
import ContractRegistration from "@/pages/ContractRegistration";
import LegalPersonList from "@/pages/LegalPersonList";
import LegalPersonRegistration from "@/pages/LegalPersonRegistration";
import LegalPersonDetails from "@/pages/LegalPersonDetails";
import PhysicalPersonList from "@/pages/PhysicalPersonList";
import PhysicalPersonRegistration from "@/pages/PhysicalPersonRegistration";
import PhysicalPersonDetails from "@/pages/PhysicalPersonDetails";
import ContractAlerts from "@/pages/ContractAlerts";
import UserPermissions from "@/pages/UserPermissions";
import ContractTemplate from "@/pages/ContractTemplate";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";

import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      retry: 1,
    },
  },
});

function App() {
  console.log('App rendering');
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<div className="flex items-center justify-center min-h-screen">Acesso negado</div>} />
            
            {/* Protected routes - require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contracts" element={<ContractList />} />
              <Route path="/contratos/finalizados" element={<ContractList />} />
              <Route path="/contracts/new" element={<ContractRegistration />} />
              <Route path="/contracts/template" element={<ContractTemplate />} />
              <Route path="/legal-persons" element={<LegalPersonList />} />
              <Route path="/legal-persons/new" element={<LegalPersonRegistration />} />
              <Route path="/legal-persons/:id" element={<LegalPersonDetails />} />
              <Route path="/physical-persons" element={<PhysicalPersonList />} />
              <Route path="/physical-persons/new" element={<PhysicalPersonRegistration />} />
              <Route path="/physical-persons/:id" element={<PhysicalPersonDetails />} />
              <Route path="/alerts" element={<ContractAlerts />} />
            </Route>
            
            {/* Admin routes - require authentication and admin role */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/users" element={<UserPermissions />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
