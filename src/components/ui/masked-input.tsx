
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { validateCPF, validateCNPJ } from "@/utils/documentValidation";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: "cpf" | "cnpj" | "none";
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, maskChar = null, disabled, value, onChange, validation = "none", ...props }, ref) => {
    const isDisabled = Boolean(disabled);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        let inputValue = e.target.value.replace(/\D/g, '');
        let maskedValue = '';
        
        // CPF: 999.999.999-99
        if (mask === "999.999.999-99" && inputValue.length <= 11) {
          if (inputValue.length > 9) {
            maskedValue = `${inputValue.substring(0, 3)}.${inputValue.substring(3, 6)}.${inputValue.substring(6, 9)}-${inputValue.substring(9, 11)}`;
          } else if (inputValue.length > 6) {
            maskedValue = `${inputValue.substring(0, 3)}.${inputValue.substring(3, 6)}.${inputValue.substring(6)}`;
          } else if (inputValue.length > 3) {
            maskedValue = `${inputValue.substring(0, 3)}.${inputValue.substring(3)}`;
          } else {
            maskedValue = inputValue;
          }
        } 
        // CNPJ: 99.999.999/9999-99
        else if (mask === "99.999.999/9999-99" && inputValue.length <= 14) {
          if (inputValue.length > 12) {
            maskedValue = `${inputValue.substring(0, 2)}.${inputValue.substring(2, 5)}.${inputValue.substring(5, 8)}/${inputValue.substring(8, 12)}-${inputValue.substring(12, 14)}`;
          } else if (inputValue.length > 8) {
            maskedValue = `${inputValue.substring(0, 2)}.${inputValue.substring(2, 5)}.${inputValue.substring(5, 8)}/${inputValue.substring(8)}`;
          } else if (inputValue.length > 5) {
            maskedValue = `${inputValue.substring(0, 2)}.${inputValue.substring(2, 5)}.${inputValue.substring(5)}`;
          } else if (inputValue.length > 2) {
            maskedValue = `${inputValue.substring(0, 2)}.${inputValue.substring(2)}`;
          } else {
            maskedValue = inputValue;
          }
        }
        // CEP: 99999-999
        else if (mask === "99999-999" && inputValue.length <= 8) {
          if (inputValue.length > 5) {
            maskedValue = `${inputValue.substring(0, 5)}-${inputValue.substring(5, 8)}`;
          } else {
            maskedValue = inputValue;
          }
        }
        // Telefone: (99) 99999-9999
        else if (mask === "(99) 99999-9999" && inputValue.length <= 11) {
          if (inputValue.length > 10) {
            maskedValue = `(${inputValue.substring(0, 2)}) ${inputValue.substring(2, 7)}-${inputValue.substring(7, 11)}`;
          } else if (inputValue.length > 7) {
            maskedValue = `(${inputValue.substring(0, 2)}) ${inputValue.substring(2, 7)}-${inputValue.substring(7)}`;
          } else if (inputValue.length > 2) {
            maskedValue = `(${inputValue.substring(0, 2)}) ${inputValue.substring(2)}`;
          } else {
            maskedValue = inputValue;
          }
        }
        // Valor monetário: 999999999.99
        else if (mask === "999999999.99") {
          inputValue = e.target.value.replace(/[^\d.]/g, '');
          const parts = inputValue.split('.');
          if (parts.length > 1) {
            maskedValue = `${parts[0]}.${parts.slice(1).join('').substring(0, 2)}`;
          } else {
            maskedValue = inputValue;
          }
        }
        else {
          maskedValue = e.target.value;
        }
        
        const maskedEvent = {
          ...e,
          target: {
            ...e.target,
            value: maskedValue
          }
        };
        
        onChange(maskedEvent);
      }
    };

    // Validação visual baseada no tipo
    const getValidationState = () => {
      if (!value || validation === "none") return "";
      
      const cleanValue = value.replace(/\D/g, '');
      
      if (validation === "cpf" && cleanValue.length === 11) {
        return validateCPF(value) ? "border-green-500" : "border-red-500";
      }
      
      if (validation === "cnpj" && cleanValue.length === 14) {
        return validateCNPJ(value) ? "border-green-500" : "border-red-500";
      }
      
      return "";
    };
    
    return (
      <Input
        ref={ref}
        className={cn(className, getValidationState())}
        disabled={isDisabled}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
