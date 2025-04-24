
// Substituindo o arquivo atual por um que usa diretamente o toast do sonner
import { toast } from "sonner";

export { toast };
export const useToast = () => {
  return {
    toast,
  };
};

