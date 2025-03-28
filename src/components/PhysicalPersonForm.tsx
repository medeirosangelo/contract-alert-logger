
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
import { UserPlus, Save, Loader2 } from "lucide-react";
import { physicalPersonsApi, PhysicalPersonInsert } from "@/services/physicalPersons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const formSchema = z.object({
  full_name: z.string().min(2, "Nome completo é obrigatório"),
  cpf: z.string().min(11, "CPF inválido").max(14),
  rg: z.string().optional(),
  birth_date: z.string().min(1, "Data de nascimento é obrigatória"),
  street: z.string().min(1, "Logradouro é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(2, "Estado é obrigatório"),
  zip_code: z.string().min(8, "CEP inválido").max(9),
  phone: z.string().min(10, "Telefone inválido").max(15),
  email: z.string().email("E-mail inválido"),
  role: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PhysicalPersonFormProps {
  initialData?: FormData;
}

const PhysicalPersonForm = ({ initialData }: PhysicalPersonFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      full_name: "",
      cpf: "",
      rg: "",
      birth_date: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zip_code: "",
      phone: "",
      email: "",
      role: "",
    },
  });

  const onSubmit = async (values: FormData) => {
    try {
      setIsSubmitting(true);
      console.log("Form submitted:", values);
      
      // Remover máscaras antes de enviar para o backend
      const cleanCpf = values.cpf.replace(/\D/g, '');
      const cleanZipCode = values.zip_code.replace(/\D/g, '');
      const cleanPhone = values.phone.replace(/\D/g, '');
      
      // Create a properly typed object matching PhysicalPersonInsert
      const personData: PhysicalPersonInsert = {
        full_name: values.full_name,
        cpf: cleanCpf,
        rg: values.rg,
        birth_date: values.birth_date,
        street: values.street,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state,
        zip_code: cleanZipCode,
        phone: cleanPhone,
        email: values.email,
        role: values.role,
      };
      
      await physicalPersonsApi.create(personData);
      
      toast({
        title: "Pessoa física cadastrada com sucesso!",
        description: "Os dados foram salvos no banco de dados.",
      });
      
      // Redirecionar para a lista após o cadastro
      navigate("/physical-persons");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Erro ao cadastrar pessoa física",
        description: "Ocorreu um erro ao salvar os dados no banco de dados.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create a custom component to wrap InputMask with proper props
  const MaskedInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement> & { mask: string }>(
    ({ mask, className, ...props }, ref) => {
      return (
        <InputMask mask={mask} maskChar={null} {...props}>
          {() => <Input ref={ref} className={className} />}
        </InputMask>
      );
    }
  );
  MaskedInput.displayName = "MaskedInput";

  return (
    <Card className="shadow-lg border-warm-200 animate-fadeIn">
      <CardHeader className="bg-warm-100 rounded-t-lg border-b border-warm-200">
        <div className="flex items-center gap-2">
          <UserPlus className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl text-primary">Cadastro de Pessoa Física</CardTitle>
        </div>
        <CardDescription>
          Preencha os dados da pessoa física para cadastro no sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-warm-800">Informações Pessoais</h3>
              <Separator className="bg-warm-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-warm-300 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <MaskedInput
                          mask="999.999.999-99"
                          className="border-warm-300 focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-warm-300 focus:border-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="border-warm-300 focus:border-primary" />
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
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <MaskedInput
                          mask="99999-999"
                          className="border-warm-300 focus:border-primary"
                          {...field}
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
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <MaskedInput
                          mask="(99) 99999-9999"
                          className="border-warm-300 focus:border-primary"
                          {...field}
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

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo ou Função (opcional)</FormLabel>
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
                    Cadastrar Pessoa Física
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

export default PhysicalPersonForm;
