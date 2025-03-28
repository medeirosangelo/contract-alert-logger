
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, disabled, ...props }, ref) => {
  // Definindo props para o InputMask diretamente
  return (
    <InputMask 
      mask={mask} 
      maskChar={null}
      disabled={disabled}
      {...props}
    >
      {(inputProps: any) => {
        return (
          <Input
            ref={ref}
            className={className}
            disabled={disabled} // Definindo disabled diretamente aqui
            {...inputProps}
          />
        );
      }}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
