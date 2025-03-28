
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  // Define a function that correctly renders the Input component with merged props
  const renderInput = (inputProps: any) => {
    const mergedProps = { ...props, ...inputProps };
    return (
      <Input
        ref={ref}
        className={className}
        {...mergedProps}
      />
    );
  };

  // The key fix: pass renderInput as a function to InputMask
  return (
    <InputMask 
      mask={mask} 
      maskChar={null}
    >
      {renderInput}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
