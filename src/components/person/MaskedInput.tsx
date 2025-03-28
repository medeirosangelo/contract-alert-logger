
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

// Properly type the component and ensure proper prop forwarding
const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  // Fix: InputMask expects children as a function, so we need to return a properly formatted Input component
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
      {(inputProps: any) => {
        // Explicitly merge the props to avoid undefined issues
        return (
          <Input 
            ref={ref} 
            className={className}
            placeholder={props.placeholder}
            // Spread both inputProps and our original props
            // while ensuring disabled and other key props are explicitly set
            disabled={props.disabled}
            readOnly={props.readOnly}
            required={props.required}
            name={props.name}
            {...inputProps}
          />
        );
      }}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
