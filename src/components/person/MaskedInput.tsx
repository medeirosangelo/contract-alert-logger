
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  // Create a properly typed render function for InputMask's children
  const renderInput = (inputProps: any) => (
    <Input
      ref={ref}
      className={className}
      {...props}  // First spread all original props
      {...inputProps}  // Then spread InputMask's props to override if needed
    />
  );

  // Instead of passing individual props, pass all props to InputMask
  return <InputMask mask={mask} maskChar={null} {...props}>{renderInput}</InputMask>;
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
