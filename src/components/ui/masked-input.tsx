
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
          if (!inputProps) {
            return <Input ref={ref} className={cn(className)} disabled={isDisabled} />;
          }
          
          // Criar um objeto de props seguro para passar para o componente Input
          return (
            <Input 
              ref={ref} 
              className={cn(className)}
              disabled={isDisabled}
              onChange={inputProps.onChange}
              onBlur={inputProps.onBlur}
              value={inputProps.value !== undefined ? inputProps.value : ''}
              type={inputProps.type || 'text'}
            />
          );
        }}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
