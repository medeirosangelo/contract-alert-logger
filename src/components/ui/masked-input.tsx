
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
          // Garantir que inputProps não é undefined
          const safeInputProps = inputProps || {};
          
          return (
            <Input 
              ref={ref} 
              className={cn(className)}
              disabled={isDisabled}
              onChange={safeInputProps.onChange}
              onBlur={safeInputProps.onBlur}
              value={safeInputProps.value || ''}
              type={safeInputProps.type || 'text'}
            />
          );
        }}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
