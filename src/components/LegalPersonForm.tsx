
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building2, Save } from "lucide-react";

const formSchema = z.object({
  companyName: z.string().min(2, "Razão social é obrigatória"),
  tradeName: z.string().min(2, "Nome fantasia é obrigatório"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  stateRegistration: z.string().optional(),
  street: z.string().min(1, "Logradouro é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zipCode: z.string().min(8, "CEP inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  email: z.string().email("E-mail inválido"),
  legalRepName: z.string().min(2, "Nome do representante legal é obrigatório"),
  legalRepCpf: z.string().min(11, "CPF do representante legal inválido"),
  legalRepRole: z.string().min(2, "Cargo do representante legal é obrigatório"),
  bank: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface LegalPersonFormProps {
  initialData?: FormData;
}

const LegalPersonForm = ({ initialData }: LegalPersonFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      companyName: "",
      tradeName: "",
      cnpj: "",
      stateRegistration: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
      email: "",
      legalRepName: "",
      legalRepCpf: "",
      legalRepRole: "",
      bank: "",
      agency: "",
      account: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Form submitted:", values);
      // Here you would typically make an API call to save the data
      toast.success("Pessoa jurídica cadastrada com sucesso!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao cadastrar pessoa jurídica");
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
                <FormField
                  control={form.control}
                  name="companyName"
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
                  name="tradeName"
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
                        <Input {...field} className="border-warm-300 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stateRegistration"
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
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-warm-300 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <h3 className="text-lg font-medium text-warm-800 mt-6">Contato</h3>
              <Separator className="bg-warm-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-warm-300 focus:border-primary" />
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
                <FormField
                  control={form.control}
                  name="legalRepName"
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
                  name="legalRepCpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF do Representante Legal</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-warm-300 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="legalRepRole"
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
              <Button type="submit" className="w-full md:w-auto gap-2 bg-primary hover:bg-primary-dark">
                <Save className="h-4 w-4" />
                Cadastrar Pessoa Jurídica
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LegalPersonForm;
