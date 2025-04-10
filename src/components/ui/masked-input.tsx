
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
          // Criar cópia segura das props em vez de usar a referência direta
          const safeInputProps = { ...inputProps };
          
          // Verificar se as props estão definidas
          if (!safeInputProps) {
            // Se inputProps for undefined, criar um objeto vazio
            return <Input ref={ref} className={cn(className)} disabled={isDisabled} />;
          }
          
          // Garantir que disabled seja passado corretamente
          return (
            <Input 
              ref={ref} 
              className={cn(className)}
              disabled={isDisabled}
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
