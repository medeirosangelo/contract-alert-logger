
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/contracts" element={
              <ProtectedRoute>
                <ContractList />
              </ProtectedRoute>
            } />

            <Route path="/contracts/new" element={
              <ProtectedRoute>
                <ContractRegistration />
              </ProtectedRoute>
            } />

            <Route path="/contracts/alerts" element={
              <ProtectedRoute>
                <ContractAlerts />
              </ProtectedRoute>
            } />

            <Route path="/physical-persons" element={
              <ProtectedRoute>
                <PhysicalPersonList />
              </ProtectedRoute>
            } />

            <Route path="/physical-persons/:id" element={
              <ProtectedRoute>
                <PhysicalPersonDetails />
              </ProtectedRoute>
            } />

            <Route path="/physical-persons/new" element={
              <ProtectedRoute>
                <PhysicalPersonRegistration />
              </ProtectedRoute>
            } />

            <Route path="/legal-persons" element={
              <ProtectedRoute>
                <LegalPersonList />
              </ProtectedRoute>
            } />

            <Route path="/legal-persons/:id" element={
              <ProtectedRoute>
                <LegalPersonDetails />
              </ProtectedRoute>
            } />

            <Route path="/legal-persons/new" element={
              <ProtectedRoute>
                <LegalPersonRegistration />
              </ProtectedRoute>
            } />

            <Route path="/user-permissions" element={
              <ProtectedRoute>
                <UserPermissions />
              </ProtectedRoute>
            } />

            <Route path="/contract-template" element={
              <ProtectedRoute>
                <ContractTemplate />
              </ProtectedRoute>
            } />

            <Route path="/documentation" element={
              <ProtectedRoute>
                <Documentation />
              </ProtectedRoute>
            } />

            <Route path="/support" element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            } />
          </Routes>
          <SonnerToaster />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
