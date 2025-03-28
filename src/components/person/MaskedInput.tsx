
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";

// Properly type the component and ensure proper prop forwarding
const MaskedInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { mask: string }
>(({ mask, className, ...props }, ref) => {
  // Create a properly typed inputProps object that we can safely pass to children function
  const inputProps = { ...props };
  
  return (
    <InputMask 
      mask={mask} 
      maskChar={null} 
      // Only pass props that InputMask expects directly
      disabled={props.disabled}
      readOnly={props.readOnly}
      required={props.required}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      {/* Properly type the input properties passed to the render function */}
      {(inputMaskProps: any) => (
        <Input 
          ref={ref} 
          className={className} 
          // Combine inputMaskProps with our original props for full functionality
          {...inputMaskProps}
          disabled={props.disabled}
        />
      )}
    </InputMask>
  );
});

MaskedInput.displayName = "MaskedInput";

export default MaskedInput;
