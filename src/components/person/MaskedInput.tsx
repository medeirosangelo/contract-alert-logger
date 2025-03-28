
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, disabled, ...props }, ref) => {
  return (
    <InputMask 
      mask={mask} 
      maskChar={null}
      disabled={disabled}
      {...props}
    >
      {(inputProps: any) => {
        // Ensure proper handling of the disabled prop
        const combinedProps = {
          ...inputProps,
          disabled: disabled || inputProps.disabled
        };
        
        return (
          <Input
            ref={ref}
            className={className}
            {...combinedProps}
          />
        );
      }}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
