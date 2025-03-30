
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
  ({ className, mask, maskChar = null, disabled = false, ...props }, ref) => {
    return (
      <InputMask
        mask={mask}
        maskChar={maskChar}
        alwaysShowMask={false}
        disabled={disabled}
        {...props}
      >
        {(inputProps: any) => {
          // Garantir que estamos passando o disabled corretamente
          const safeInputProps = {
            ...inputProps,
            disabled: disabled // Explicitamente definir disabled
          };
          
          return (
            <Input 
              ref={ref} 
              className={cn(className)}
              disabled={disabled} // Garantir que disabled é passado para o Input
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
