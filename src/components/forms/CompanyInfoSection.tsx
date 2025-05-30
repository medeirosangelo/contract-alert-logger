
import React from "react";
import { Control, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MaskedInput } from "@/components/ui/masked-input";
import { Separator } from "@/components/ui/separator";

interface CompanyInfoSectionProps {
  control: Control<any>;
}

const CompanyInfoSection = ({ control }: CompanyInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-800">Informações da Empresa</h3>
      <Separator className="bg-warm-200" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Razão Social</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="trade_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Fantasia</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <MaskedInput
                  mask="99.999.999/9999-99"
                  className="border-warm-300 focus:border-primary"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="state_registration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inscrição Estadual (opcional)</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CompanyInfoSection;
