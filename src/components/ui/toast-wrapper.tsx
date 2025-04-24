
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

// Função principal chamável
function toastFunction(props: ToastProps | string) {
  if (typeof props === 'string') {
    return sonnerToast(props);
  }
  return showToast(props);
}

// Adicionando métodos ao objeto da função
toastFunction.success = (props: ToastProps | string) => {
  if (typeof props === 'string') {
    return sonnerToast.success(props);
  }
  const { title, description, action } = props as ToastProps;
  return sonnerToast.success(title || "", { description, action });
};

toastFunction.error = (props: ToastProps | string) => {
  if (typeof props === 'string') {
    return sonnerToast.error(props);
  }
  const { title, description, action } = props as ToastProps;
  return sonnerToast.error(title || "", { description, action });
};

toastFunction.loading = (props: ToastProps | string) => {
  if (typeof props === 'string') {
    return sonnerToast.loading(props);
  }
  const { title, description } = props as ToastProps;
  return sonnerToast.loading(title || "", { description });
};

// Exportando como objeto chamável com métodos
export const toast = toastFunction;
