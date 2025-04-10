
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
    
    // Não usamos mais children diretamente, esta é a mudança crítica
    return (
      <InputMask
        mask={mask}
        maskChar={maskChar}
        disabled={isDisabled}
        alwaysShowMask={false}
        {...props}
      >
        {(inputProps: any) => {
          return (
            <Input 
              ref={ref} 
              className={cn(className)}
              disabled={isDisabled}
              onChange={inputProps?.onChange}
              onBlur={inputProps?.onBlur}
              value={inputProps?.value || ''}
              type={inputProps?.type || 'text'}
            />
          );
        }}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
