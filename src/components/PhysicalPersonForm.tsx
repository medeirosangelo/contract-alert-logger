import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Save, Loader2 } from "lucide-react";
import { physicalPersonsApi } from "@/services/physicalPersons";
import { PhysicalPersonInsert } from "@/services/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoSection from "@/components/forms/PersonalInfoSection";
import AddressSection from "@/components/forms/AddressSection";
import ContactSection from "@/components/forms/ContactSection";
import BankingInfoSection from "@/components/forms/BankingInfoSection";
import FormHeader from "@/components/forms/FormHeader";
import { validateCPF } from "@/utils/documentValidation";
import DocumentUpload from "./DocumentUpload";

const formSchema = z.object({
  full_name: z.string().min(2, "Nome completo é obrigatório"),
  cpf: z.string()
    .min(11, "CPF inválido")
    .max(14)
    .refine((cpf) => validateCPF(cpf), "CPF inválido"),
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
  initialData?: (FormData & { id: string });
  onSuccess?: () => void;
}

const PhysicalPersonForm = ({ initialData, onSuccess }: PhysicalPersonFormProps) => {
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
      
      // Verificar duplicatas por CPF
      const cleanCpf = values.cpf.replace(/\D/g, '');
      
      try {
        const existingPerson = await physicalPersonsApi.getByCPF(cleanCpf);
        if (existingPerson) {
          toast.error("Já existe uma pessoa cadastrada com este CPF!");
          return;
        }
      } catch (error) {
        // Se der erro na consulta, continua o cadastro
        console.log("Erro ao verificar duplicata (continuando):", error);
      }
      
      const cleanZipCode = values.zip_code.replace(/\D/g, '');
      const cleanPhone = values.phone.replace(/\D/g, '');
      
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
      toast.success("Pessoa física cadastrada com sucesso!");
      navigate("/physical-persons");
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Ocorreu um erro ao salvar os dados.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <FormHeader 
        title={initialData ? "Editar Pessoa Física" : "Cadastrar Pessoa Física"}
        description={initialData ? "Atualize as informações da pessoa física" : "Preencha os dados da nova pessoa física"}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoSection control={form.control} />
          <AddressSection control={form.control} />
          <ContactSection control={form.control} />
          <BankingInfoSection control={form.control} />

          <div className="flex justify-end pt-6">
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? "Salvando..." : initialData ? "Atualizar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Componente de Upload - só mostra após salvar */}
      {initialData && (
        <DocumentUpload 
          entityType="physical_person"
          entityId={initialData.id}
          title="Documentos da Pessoa Física"
        />
      )}
    </div>
  );
};

export default PhysicalPersonForm;
