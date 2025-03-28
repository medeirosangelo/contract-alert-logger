
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, disabled = false, ...props }, ref) => {
  return (
    <InputMask 
      mask={mask} 
      maskChar={null}
      disabled={disabled}
      {...props}
    >
      {(inputProps: any) => {
        // Ensure we're properly handling the disabled property
        return (
          <Input
            ref={ref}
            className={className}
            disabled={disabled}
            {...inputProps}
          />
        );
      }}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
