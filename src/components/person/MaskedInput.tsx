
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

// Custom component to wrap InputMask with proper props
const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  return (
    <InputMask mask={mask} maskChar={null} {...props}>
      {() => <Input ref={ref} className={className} />}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
