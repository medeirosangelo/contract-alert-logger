
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask: string;
  maskChar?: string | null;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Implementação personalizada para substituir o InputMask que está causando problemas
const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, maskChar = null, disabled, value, onChange, ...props }, ref) => {
    // Garante que disabled seja sempre um booleano
    const isDisabled = Boolean(disabled);
    
    // Função para aplicar máscara manualmente durante a digitação
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        // Implementação simplificada de máscara para tipos comuns
        let inputValue = e.target.value.replace(/\D/g, '');
        let maskedValue = '';
        let maskIndex = 0;
        
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
          // Remove tudo exceto números e ponto
          inputValue = e.target.value.replace(/[^\d.]/g, '');
          
          // Garante apenas um ponto decimal
          const parts = inputValue.split('.');
          if (parts.length > 1) {
            maskedValue = `${parts[0]}.${parts.slice(1).join('').substring(0, 2)}`;
          } else {
            maskedValue = inputValue;
          }
        }
        // Para outros tipos de máscara
        else {
          maskedValue = e.target.value;
        }
        
        // Cria um novo evento com o valor mascarado
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
    
    return (
      <Input
        ref={ref}
        className={cn(className)}
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
