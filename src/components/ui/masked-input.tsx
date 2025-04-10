
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
    // Ensure disabled is always a boolean
    const isDisabled = disabled === true;
    
    return (
      <InputMask
        mask={mask}
        maskChar={maskChar}
        alwaysShowMask={false}
        disabled={isDisabled}
        {...props}
      >
        {(inputProps: any) => (
          <Input 
            ref={ref} 
            className={cn(className)}
            disabled={isDisabled}
            {...inputProps}
          />
        )}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
