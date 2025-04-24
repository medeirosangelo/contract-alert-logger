
import { toast as sonnerToast } from "sonner";
import { toast as compatToast } from "@/components/ui/toast-wrapper";

// Exportamos o wrapper compatível com chamada direta
export const toast = compatToast;

// Hook para compatibilidade com o shadcn/ui
export const useToast = () => {
  return {
    toast: compatToast,
    // Propriedade toasts como array vazio para evitar erro de map
    toasts: []
  };
};
