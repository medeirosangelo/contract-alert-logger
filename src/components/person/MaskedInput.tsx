
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  // Passando todas as props para o InputMask, inclusive as que podem ser undefined
  return (
    <InputMask 
      mask={mask} 
      maskChar={null}
      {...props} // Passando todas as props para o InputMask
    >
      {(inputProps: any) => (
        <Input
          ref={ref}
          className={className}
          {...inputProps}
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
