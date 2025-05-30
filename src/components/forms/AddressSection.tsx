
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
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useViaCep } from "@/hooks/useViaCep";

interface AddressSectionProps {
  control: Control<any>;
  form?: UseFormReturn<any>;
}

const AddressSection = ({ control, form }: AddressSectionProps) => {
  const { fetchAddress, isLoading } = useViaCep();

  const handleCepSearch = async () => {
    if (!form) return;
    
    const zipCode = form.getValues("zip_code");
    if (!zipCode || zipCode.length < 8) {
      return;
    }

    const addressData = await fetchAddress(zipCode);
    if (addressData && form) {
      form.setValue("street", addressData.logradouro);
      form.setValue("neighborhood", addressData.bairro);
      form.setValue("city", addressData.localidade);
      form.setValue("state", addressData.uf);
      if (addressData.complemento) {
        form.setValue("complement", addressData.complemento);
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-warm-800 mt-6">Endereço</h3>
      <Separator className="bg-warm-200" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-1">
          <FormField
            control={control}
            name="zip_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <MaskedInput
                      mask="99999-999"
                      className="border-warm-300 focus:border-primary"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleCepSearch}
                    disabled={isLoading}
                    className="shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logradouro</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento (opcional)</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input {...field} className="border-warm-300 focus:border-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
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

export default AddressSection;
