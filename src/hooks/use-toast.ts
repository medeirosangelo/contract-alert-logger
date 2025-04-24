
import { toast as sonnerToast } from "sonner";
import { toast as compatToast } from "@/components/ui/toast-wrapper";

// Exportamos tanto o toast original quanto o wrapper de compatibilidade
export const toast = compatToast;

// Hook para compatibilidade
export const useToast = () => {
  return {
    toast: compatToast,
    // Propriedade vazia para evitar erro de map em undefined
    toasts: []
  };
};
