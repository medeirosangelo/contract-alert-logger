
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
          // Se inputProps for undefined, retorna componente com propriedades mínimas
          if (!inputProps) {
            return <Input ref={ref} className={cn(className)} disabled={isDisabled} />;
          }
          
          // Define propriedades seguras com valores padrão para evitar undefined
          const safeProps = {
            onChange: typeof inputProps.onChange === 'function' ? inputProps.onChange : undefined,
            onBlur: typeof inputProps.onBlur === 'function' ? inputProps.onBlur : undefined,
            value: inputProps.value !== undefined ? inputProps.value : '',
            type: inputProps.type || 'text',
          };
          
          return (
            <Input 
              ref={ref} 
              className={cn(className)}
              disabled={isDisabled}
              {...safeProps}
            />
          );
        }}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
