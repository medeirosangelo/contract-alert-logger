
import React from "react";
import { Control } from "react-hook-form";
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

interface LegalRepresentativeSectionProps {
  control: Control<any>;
}

const LegalRepresentativeSection = ({ control }: LegalRepresentativeSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-800 mt-6">Representante Legal</h3>
      <Separator className="bg-warm-200" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="legal_rep_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Representante Legal</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="legal_rep_cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF do Representante Legal</FormLabel>
              <FormControl>
                <MaskedInput
                  mask="999.999.999-99"
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
          name="legal_rep_role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo do Representante Legal</FormLabel>
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

export default LegalRepresentativeSection;
