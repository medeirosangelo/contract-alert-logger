
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import InputMask from "react-input-mask";
import { Control } from "react-hook-form";

interface ContractDetailsProps {
  totalValue: string;
  duration: string;
  signatureDate: string;
  publicationDate: string;
  priceAdjustmentTerm: string;
  adjustmentIndex: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formControl: Control<any>;
  errors: any;
}

// Create a MaskedInput component that handles the disabled prop properly
const MaskedInput = ({ mask, value, onChange, id, name, className, disabled = false }: {
  mask: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  name: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <InputMask
      mask={mask}
      maskChar={null}
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      disabled={disabled}
    >
      {(inputProps: any) => (
        <Input
          {...inputProps}
          type="text"
          className={className}
          disabled={disabled}
        />
      )}
    </InputMask>
  );
};

const ContractDetails = ({ 
  totalValue, 
  duration, 
  signatureDate, 
  publicationDate, 
  priceAdjustmentTerm, 
  adjustmentIndex, 
  onChange,
  formControl,
  errors
}: ContractDetailsProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Detalhes do Contrato</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label 
              htmlFor="totalValue"
              className={errors.totalValue ? "text-destructive" : ""}
            >
              Valor Total (R$)
            </Label>
            <FormControl>
              <MaskedInput
                mask="999999999.99"
                value={totalValue}
                onChange={onChange}
                id="totalValue"
                name="totalValue"
                className={errors.totalValue ? "border-destructive" : ""}
              />
            </FormControl>
            {errors.totalValue && (
              <FormMessage>{errors.totalValue.message}</FormMessage>
            )}
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label 
              htmlFor="duration"
              className={errors.duration ? "text-destructive" : ""}
            >
              Duração (meses)
            </Label>
            <FormControl>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={duration}
                onChange={onChange}
                className={errors.duration ? "border-destructive" : ""}
              />
            </FormControl>
            {errors.duration && (
              <FormMessage>{errors.duration.message}</FormMessage>
            )}
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label 
              htmlFor="signatureDate"
              className={errors.signatureDate ? "text-destructive" : ""}
            >
              Data de Assinatura
            </Label>
            <FormControl>
              <Input
                id="signatureDate"
                name="signatureDate"
                type="date"
                value={signatureDate}
                onChange={onChange}
                className={errors.signatureDate ? "border-destructive" : ""}
              />
            </FormControl>
            {errors.signatureDate && (
              <FormMessage>{errors.signatureDate.message}</FormMessage>
            )}
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="publicationDate">
              Data de Publicação
            </Label>
            <FormControl>
              <Input
                id="publicationDate"
                name="publicationDate"
                type="date"
                value={publicationDate}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="priceAdjustmentTerm">
              Prazo para Reajuste (meses)
            </Label>
            <FormControl>
              <Input
                id="priceAdjustmentTerm"
                name="priceAdjustmentTerm"
                type="number"
                value={priceAdjustmentTerm}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="adjustmentIndex">
              Índice de Reajuste
            </Label>
            <FormControl>
              <Input
                id="adjustmentIndex"
                name="adjustmentIndex"
                value={adjustmentIndex}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;
