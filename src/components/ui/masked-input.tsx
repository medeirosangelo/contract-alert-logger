
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
    
    // Função de renderização segura para o children do InputMask
    const renderInput = (inputProps: any) => {
      // Se inputProps for undefined ou null, retorna componente com propriedades mínimas
      if (!inputProps) {
        return <Input ref={ref} className={cn(className)} disabled={isDisabled} />;
      }
      
      // Define propriedades seguras com valores padrão para evitar undefined
      const safeProps = {
        onChange: typeof inputProps.onChange === 'function' ? inputProps.onChange : undefined,
        onBlur: typeof inputProps.onBlur === 'function' ? inputProps.onBlur : undefined,
        value: inputProps.value !== undefined ? inputProps.value : '',
        type: inputProps.type || 'text',
      };
      
      return (
        <Input 
          ref={ref} 
          className={cn(className)}
          disabled={isDisabled}
          {...safeProps}
        />
      );
    };
    
    // Passando o renderInput como children em vez de usar uma função inline
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
