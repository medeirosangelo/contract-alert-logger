
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Save, Loader2 } from "lucide-react";
import { legalPersonsApi, LegalPersonInsert } from "@/services/legalPersons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

// Create a MaskedInput component that properly handles props
const MaskedInput = ({ 
  mask, 
  value, 
  onChange, 
  id, 
  name, 
  className, 
  disabled = false 
}: {
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
      disabled={disabled}
    >
      {(inputProps: any) => {
        // Make sure we correctly handle the disabled prop
        const props = { ...inputProps, disabled: disabled || false };
        return (
          <Input
            {...props}
            id={id}
            name={name}
            type="text"
            className={className}
          />
        );
      }}
    </InputMask>
  );
};

const formSchema = z.object({
  company_name: z.string().min(2, "Razão social é obrigatória"),
  trade_name: z.string().min(2, "Nome fantasia é obrigatório"),
  cnpj: z.string().min(14, "CNPJ inválido").max(18),
  state_registration: z.string().optional(),
  street: z.string().min(1, "Logradouro é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zip_code: z.string().min(8, "CEP inválido").max(9),
  phone: z.string().min(10, "Telefone inválido").max(15),
  email: z.string().email("E-mail inválido"),
  legal_rep_name: z.string().min(2, "Nome do representante legal é obrigatório"),
  legal_rep_cpf: z.string().min(11, "CPF do representante legal inválido").max(14),
  legal_rep_role: z.string().min(2, "Cargo do representante legal é obrigatório"),
  bank: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface LegalPersonFormProps {
  initialData?: FormData;
}

const LegalPersonForm = ({ initialData }: LegalPersonFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      company_name: "",
      trade_name: "",
      cnpj: "",
      state_registration: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
      email: "",
      legal_rep_name: "",
      legal_rep_cpf: "",
      legal_rep_role: "",
      bank: "",
      agency: "",
      account: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsSubmitting(true);
      console.log("Form submitted:", values);
      
      // Remover máscaras antes de enviar para o backend
      const cleanCnpj = values.cnpj.replace(/\D/g, '');
      const cleanCpf = values.legal_rep_cpf.replace(/\D/g, '');
      const cleanZipCode = values.zip_code.replace(/\D/g, '');
      const cleanPhone = values.phone.replace(/\D/g, '');
      
      // Create a properly typed object matching LegalPersonInsert
      const companyData: LegalPersonInsert = {
        company_name: values.company_name,
        trade_name: values.trade_name,
        cnpj: cleanCnpj,
        state_registration: values.state_registration,
        street: values.street,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
        zip_code: cleanZipCode,
        phone: cleanPhone,
        email: values.email,
        legal_rep_name: values.legal_rep_name,
        legal_rep_cpf: cleanCpf,
        legal_rep_role: values.legal_rep_role,
        bank: values.bank,
        agency: values.agency,
        account: values.account,
      };
      
      await legalPersonsApi.create(companyData);
      
      toast({
        title: "Pessoa jurídica cadastrada com sucesso!",
        description: "Os dados foram salvos no banco de dados.",
      });
      
      // Redirecionar para a lista após o cadastro
      navigate("/legal-persons");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao cadastrar pessoa jurídica",
        description: "Ocorreu um erro ao salvar os dados no banco de dados.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-warm-200 animate-fadeIn">
      <CardHeader className="bg-warm-100 rounded-t-lg border-b border-warm-200">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl text-primary">Cadastro de Pessoa Jurídica</CardTitle>
        </div>
        <CardDescription>
          Preencha os dados da pessoa jurídica para cadastro no sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-800">Informações da Empresa</h3>
              <Separator className="bg-warm-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Info Fields */}
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Controller
                          name="cnpj"
                          control={form.control}
                          render={({ field }) => (
                            <MaskedInput
                              mask="99.999.999/9999-99"
                              value={field.value}
                              onChange={field.onChange}
                              id="cnpj"
                              name="cnpj"
                              className="border-warm-300 focus:border-primary"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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

              <h3 className="text-lg font-medium text-warm-800 mt-6">Endereço</h3>
              <Separator className="bg-warm-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address Fields */}
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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

                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Controller
                          name="zip_code"
                          control={form.control}
                          render={({ field }) => (
                            <MaskedInput
                              mask="99999-999"
                              value={field.value}
                              onChange={field.onChange}
                              id="zip_code"
                              name="zip_code"
                              className="border-warm-300 focus:border-primary"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-lg font-medium text-warm-800 mt-6">Contato</h3>
              <Separator className="bg-warm-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Fields */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Controller
                          name="phone"
                          control={form.control}
                          render={({ field }) => (
                            <MaskedInput
                              mask="(99) 99999-9999"
                              value={field.value}
                              onChange={field.onChange}
                              id="phone"
                              name="phone"
                              className="border-warm-300 focus:border-primary"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} className="border-warm-300 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-lg font-medium text-warm-800 mt-6">Representante Legal</h3>
              <Separator className="bg-warm-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Legal Representative Fields */}
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="legal_rep_cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF do Representante Legal</FormLabel>
                      <FormControl>
                        <Controller
                          name="legal_rep_cpf"
                          control={form.control}
                          render={({ field }) => (
                            <MaskedInput
                              mask="999.999.999-99"
                              value={field.value}
                              onChange={field.onChange}
                              id="legal_rep_cpf"
                              name="legal_rep_cpf"
                              className="border-warm-300 focus:border-primary"
                            />
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
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

              <h3 className="text-lg font-medium text-warm-800 mt-6">Dados Bancários (Opcional)</h3>
              <Separator className="bg-warm-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Banking Fields */}
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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

            <CardFooter className="flex justify-end px-0 pt-4">
              <Button 
                type="submit" 
                className="w-full md:w-auto gap-2 bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Cadastrar Pessoa Jurídica
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LegalPersonForm;
