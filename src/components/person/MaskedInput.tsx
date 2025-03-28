
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, disabled = false, ...props }, ref) => {
  // Create a new props object that explicitly includes disabled
  const inputProps = {
    disabled,
    ...props
  };
  
  return (
    <InputMask 
      mask={mask} 
      maskChar={null}
      disabled={disabled}
      {...inputProps}
    >
      {(inputProps: any) => {
        // Ensure disabled is explicitly passed to Input
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
