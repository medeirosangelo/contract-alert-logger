
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

// Custom component to wrap InputMask with proper props
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
      {/* Explicitly pass the inputProps including disabled to the Input component */}
      {(inputProps: any) => (
        <Input 
          ref={ref} 
          className={className} 
          disabled={disabled}
          {...inputProps}
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
