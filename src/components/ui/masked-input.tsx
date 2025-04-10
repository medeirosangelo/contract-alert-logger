
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, maskChar = null, disabled, ...props }, ref) => {
    // Garantir que disabled seja sempre um booleano
    const isDisabled = Boolean(disabled);
    
    return (
      <InputMask
        mask={mask}
        maskChar={maskChar}
        disabled={isDisabled}
        alwaysShowMask={false}
        {...props}
      >
        {(inputProps: any) => {
          // Proteger contra inputProps undefined
          if (!inputProps) {
            return <Input ref={ref} className={cn(className)} disabled={isDisabled} />;
          }
          
          // Criar uma cópia segura das props para evitar problemas de referência
          const safeInputProps = { ...inputProps };
          
          // Garantir que disabled seja explicitamente definido
          safeInputProps.disabled = isDisabled;
          
          // Remover props duplicadas ou problemáticas
          delete safeInputProps.mask;
          delete safeInputProps.maskChar;
          delete safeInputProps.alwaysShowMask;
          
          return (
            <Input 
              ref={ref} 
              className={cn(className)} 
              {...safeInputProps} 
            />
          );
        }}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
