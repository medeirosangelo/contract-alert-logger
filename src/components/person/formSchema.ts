
import * as z from "zod";

export const physicalPersonFormSchema = z.object({
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

export type PhysicalPersonFormData = z.infer<typeof physicalPersonFormSchema>;
