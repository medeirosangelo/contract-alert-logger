
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
import { Separator } from "@/components/ui/separator";

interface BankingInfoSectionProps {
  control: Control<any>;
}

const BankingInfoSection = ({ control }: BankingInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-800 mt-6">Dados Bancários (Opcional)</h3>
      <Separator className="bg-warm-200" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="bank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banco</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="agency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agência</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta Corrente</FormLabel>
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

export default BankingInfoSection;
