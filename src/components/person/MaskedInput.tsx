
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  return (
    <InputMask 
      mask={mask} 
      maskChar={null}
      {...props} // Garantindo que todas as props sejam passadas ao InputMask
    >
      {(inputProps: any) => (
        <Input
          ref={ref}
          className={className}
          {...inputProps} // Usando as props transformadas pelo InputMask
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
