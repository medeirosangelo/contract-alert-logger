
import React from "react";
import InputMask from "react-input-mask";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, maskChar = null, disabled = false, ...props }, ref) => {
    return (
      <InputMask
        mask={mask}
        maskChar={maskChar}
        alwaysShowMask={false}
        disabled={disabled}
        {...props}
      >
        {(inputProps: any) => {
          // Ensure disabled prop is explicitly passed to Input
          const inputPropsWithDisabled = { 
            ...inputProps, 
            disabled: disabled || false,
            className: cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )
          };
          return <Input ref={ref} {...inputPropsWithDisabled} />;
        }}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
