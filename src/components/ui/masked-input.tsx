
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
  ({ className, mask, maskChar = null, disabled, ...props }, ref) => {
    // Garantir que disabled seja sempre um booleano
    const isDisabled = Boolean(disabled);
    
    // Função de renderização separada para o InputMask
    // Esta abordagem garante que as props sejam tratadas corretamente
    const renderInput = (inputProps: any) => {
      // Evitar props undefined
      const safeProps = { ...props };
      const safeInputProps = inputProps || {};
      
      // Não passar as props diretamente para o Input para evitar duplicação
      // O InputMask já cria props com handlers para onChange, onBlur, etc.
      return (
        <Input 
          ref={ref} 
          className={cn(className)}
          disabled={isDisabled}
          {...safeInputProps}
        />
      );
    };
    
    return (
      <InputMask
        mask={mask}
        maskChar={maskChar}
        disabled={isDisabled}
        alwaysShowMask={false}
        {...props}
      >
        {renderInput}
      </InputMask>
    );
  }
);

MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
