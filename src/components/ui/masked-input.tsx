
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
          // Garantir que inputProps não seja undefined
          if (!inputProps) {
            // Se inputProps for undefined, retorna input com propriedades mínimas
            return <Input ref={ref} className={cn(className)} disabled={isDisabled} />;
          }
          
          // Criar um objeto com propriedades seguras, garantindo que nenhuma seja undefined
          const safeProps = {
            onChange: inputProps.onChange || undefined,
            onBlur: inputProps.onBlur || undefined,
            value: inputProps.value !== undefined ? inputProps.value : '',
            type: inputProps.type || 'text'
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
