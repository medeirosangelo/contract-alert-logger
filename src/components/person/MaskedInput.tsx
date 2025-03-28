
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, disabled = false, ...props }, ref) => {
  // Passando todas as props para o InputMask e também explicitamente o disabled
  const inputProps = {
    mask,
    maskChar: null,
    disabled,
    ...props
  };

  return (
    <InputMask {...inputProps}>
      {(inputMaskProps: any) => (
        <Input
          ref={ref}
          className={className}
          disabled={disabled}
          {...inputMaskProps}
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
