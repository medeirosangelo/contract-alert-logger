
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

// Properly type the component and ensure proper prop forwarding
const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  return (
    <InputMask mask={mask} maskChar={null} {...props}>
      {(inputProps: any) => (
        <Input 
          ref={ref} 
          className={className} 
          {...inputProps} 
          // Explicitly handle the disabled prop to avoid issues
          disabled={props.disabled}
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
