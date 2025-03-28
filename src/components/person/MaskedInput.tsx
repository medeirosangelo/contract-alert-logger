
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
      {(inputProps: any) => (
        <Input
          ref={ref}
          className={className}
          disabled={disabled}
          {...inputProps}
          type={inputProps.type || "text"}
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
