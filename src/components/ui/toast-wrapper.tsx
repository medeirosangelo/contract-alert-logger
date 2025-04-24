
import { toast as sonnerToast, type ToastT } from "sonner";
import { ReactNode } from "react";

interface ToastProps {
  title?: string;
  description?: string | ReactNode;
  action?: ReactNode;
  variant?: "default" | "destructive";
}

export function showToast({ title, description, action, variant }: ToastProps) {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
      action
    });
  }
  
  return sonnerToast(title || "", {
    description,
    action
  });
}

// Exportando funções compatíveis com a antiga API
export const toast = {
  // Método padrão
  toast: (props: ToastProps | string) => {
    if (typeof props === 'string') {
      return sonnerToast(props);
    }
    return showToast(props);
  },
  
  // Para mensagens de sucesso
  success: (props: ToastProps | string) => {
    if (typeof props === 'string') {
      return sonnerToast.success(props);
    }
    const { title, description, action } = props as ToastProps;
    return sonnerToast.success(title || "", { description, action });
  },
  
  // Para mensagens de erro
  error: (props: ToastProps | string) => {
    if (typeof props === 'string') {
      return sonnerToast.error(props);
    }
    const { title, description, action } = props as ToastProps;
    return sonnerToast.error(title || "", { description, action });
  },
  
  // Para mensagens de carregamento
  loading: (props: ToastProps | string) => {
    if (typeof props === 'string') {
      return sonnerToast.loading(props);
    }
    const { title, description } = props as ToastProps;
    return sonnerToast.loading(title || "", { description });
  }
};
