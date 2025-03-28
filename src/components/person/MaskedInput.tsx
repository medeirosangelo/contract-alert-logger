
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

// Properly type the component and ensure proper prop forwarding
const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  return (
    <InputMask 
      mask={mask} 
      maskChar={null} 
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      disabled={props.disabled}
      readOnly={props.readOnly}
      required={props.required}
      name={props.name}
    >
      {() => (
        <Input 
          ref={ref} 
          className={className}
          disabled={props.disabled}
          readOnly={props.readOnly}
          required={props.required}
          name={props.name}
          placeholder={props.placeholder}
          {...props}
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
