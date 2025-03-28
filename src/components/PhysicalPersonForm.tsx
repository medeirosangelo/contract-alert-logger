
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import { physicalPersonsApi, PhysicalPersonInsert } from "@/services/physicalPersons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import our refactored components
import PersonalInfoSection from "./person/PersonalInfoSection";
import AddressSection from "./person/AddressSection";
import ContactSection from "./person/ContactSection";
import FormFooter from "./person/FormFooter";
import { physicalPersonFormSchema, PhysicalPersonFormData } from "./person/formSchema";

interface PhysicalPersonFormProps {
  initialData?: PhysicalPersonFormData;
}

const PhysicalPersonForm = ({ initialData }: PhysicalPersonFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<PhysicalPersonFormData>({
    resolver: zodResolver(physicalPersonFormSchema),
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

  const onSubmit = async (values: PhysicalPersonFormData) => {
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
              <PersonalInfoSection control={form.control} />
              <AddressSection control={form.control} />
              <ContactSection control={form.control} />
            </div>
            <FormFooter isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PhysicalPersonForm;
