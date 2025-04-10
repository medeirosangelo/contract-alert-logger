
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
          // Certifica-se de que estamos lidando com um objeto não nulo/undefined
          const safeInputProps = inputProps || {};
          
          // Extrair apenas as propriedades necessárias
          const safeProps = {
            onChange: safeInputProps.onChange,
            onBlur: safeInputProps.onBlur,
            value: safeInputProps.value,
            type: safeInputProps.type
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
