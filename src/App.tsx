import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ContractRegistration from "./pages/ContractRegistration";
import ContractList from "./pages/ContractList";
import ContractAlerts from "./pages/ContractAlerts";
import PhysicalPersonRegistration from "./pages/PhysicalPersonRegistration";
import LegalPersonRegistration from "./pages/LegalPersonRegistration";
import PhysicalPersonList from "./pages/PhysicalPersonList";
import LegalPersonList from "./pages/LegalPersonList";
import PhysicalPersonDetails from "./pages/PhysicalPersonDetails";
import LegalPersonDetails from "./pages/LegalPersonDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contratos/novo" element={<ContractRegistration />} />
          <Route path="/contratos" element={<ContractList />} />
          <Route path="/alertas/contratos" element={<ContractAlerts />} />
          <Route path="/pessoas/fisica/novo" element={<PhysicalPersonRegistration />} />
          <Route path="/pessoas/juridica/novo" element={<LegalPersonRegistration />} />
          <Route path="/pessoas/fisica" element={<PhysicalPersonList />} />
          <Route path="/pessoas/juridica" element={<LegalPersonList />} />
          <Route path="/pessoas/fisica/:id" element={<PhysicalPersonDetails />} />
          <Route path="/pessoas/juridica/:id" element={<LegalPersonDetails />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;