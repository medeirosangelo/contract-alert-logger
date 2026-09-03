import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Save, Loader2, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

import { supabase } from "@/integrations/supabase/client";
import { contractsApi } from "@/services/contracts";
import { legalPersonsApi } from "@/services/legalPersons";
import { physicalPersonsApi } from "@/services/physicalPersons";
import type { ContractInsert } from "@/services/types";
import DocumentUploadComponent from "./DocumentUpload";

const NONE = "__none__";

const contractSchema = z
  .object({
    contract_number: z.string().trim().min(1, "Número do contrato é obrigatório"),
    object: z.string().trim().min(5, "Descreva o objeto do contrato (mín. 5 caracteres)"),

    contractor_id: z.string().min(1, "Selecione a empresa contratante"),
    contracted_id: z.string().min(1, "Selecione a empresa contratada"),
    legal_rep_id: z.string().optional(),
    witness1_id: z.string().optional(),
    witness2_id: z.string().optional(),

    total_value: z
      .string()
      .min(1, "Valor total é obrigatório")
      .refine((v) => Number(v.replace(",", ".")) > 0, "Informe um valor maior que zero"),
    duration: z
      .string()
      .min(1, "Duração é obrigatória")
      .refine((v) => Number(v) > 0, "Duração deve ser maior que zero"),

    signature_date: z.string().min(1, "Data de assinatura é obrigatória"),
    publication_date: z.string().optional(),
    start_date: z.string().min(1, "Data de início é obrigatória"),
    end_date: z.string().min(1, "Data de vencimento é obrigatória"),

    price_adjustment_term: z.string().optional(),
    adjustment_index: z.string().optional(),

    bank: z.string().optional(),
    agency: z.string().optional(),
    account: z.string().optional(),
    payment_term: z.string().optional(),

    budget_unit: z.string().optional(),
    work_program: z.string().optional(),
    expense_nature: z.string().optional(),
    resource_source: z.string().optional(),

    delay_penalty: z.string().optional(),
    termination_penalty: z.string().optional(),

    signature_location: z.string().optional(),
    general_observations: z.string().optional(),
    status: z.string().min(1),
  })
  .refine((d) => !d.end_date || !d.start_date || d.end_date > d.start_date, {
    message: "O vencimento deve ser posterior ao início",
    path: ["end_date"],
  })
  .refine((d) => d.witness1_id === NONE || !d.witness1_id || d.witness1_id !== d.witness2_id, {
    message: "As testemunhas devem ser pessoas diferentes",
    path: ["witness2_id"],
  });

type FormData = z.infer<typeof contractSchema>;

const emptyValues: FormData = {
  contract_number: "",
  object: "",
  contractor_id: "",
  contracted_id: "",
  legal_rep_id: NONE,
  witness1_id: NONE,
  witness2_id: NONE,
  total_value: "",
  duration: "12",
  signature_date: "",
  publication_date: "",
  start_date: "",
  end_date: "",
  price_adjustment_term: "",
  adjustment_index: "",
  bank: "",
  agency: "",
  account: "",
  payment_term: "",
  budget_unit: "",
  work_program: "",
  expense_nature: "",
  resource_source: "",
  delay_penalty: "",
  termination_penalty: "",
  signature_location: "",
  general_observations: "",
  status: "active",
};

const addMonths = (dateStr: string, months: number) => {
  if (!dateStr || !months || isNaN(months)) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-lg border border-warm-200 bg-white p-6 shadow-sm">
    <h3 className="mb-4 text-lg font-semibold text-warm-800">{title}</h3>
    {children}
  </section>
);

const ContractForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedContractId, setSavedContractId] = useState<string | null>(id ?? null);

  const form = useForm<FormData>({
    resolver: zodResolver(contractSchema),
    mode: "onBlur",
    defaultValues: emptyValues,
  });

  const { data: legalPersons = [], isLoading: loadingLegal } = useQuery({
    queryKey: ["legalPersons"],
    queryFn: legalPersonsApi.getAll,
  });

  const { data: physicalPersons = [], isLoading: loadingPhysical } = useQuery({
    queryKey: ["physicalPersons"],
    queryFn: physicalPersonsApi.getAll,
  });

  const { data: existing, isLoading: loadingContract } = useQuery({
    queryKey: ["contract", id],
    enabled: isEditing,
    queryFn: async () => {
      const { data, error } = await supabase.from("contracts").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
  });

  // Preenche o formulário no modo edição
  useEffect(() => {
    if (!existing) return;
    form.reset({
      ...emptyValues,
      contract_number: existing.contract_number ?? "",
      object: existing.object ?? "",
      contractor_id: existing.contractor_id ?? "",
      contracted_id: existing.contracted_id ?? "",
      legal_rep_id: existing.legal_rep_id ?? NONE,
      witness1_id: existing.witness1_id ?? NONE,
      witness2_id: existing.witness2_id ?? NONE,
      total_value: existing.total_value != null ? String(existing.total_value) : "",
      duration: existing.duration != null ? String(existing.duration) : "",
      signature_date: existing.signature_date ?? "",
      publication_date: existing.publication_date ?? "",
      start_date: existing.start_date ?? "",
      end_date: existing.end_date ?? "",
      price_adjustment_term:
        existing.price_adjustment_term != null ? String(existing.price_adjustment_term) : "",
      adjustment_index: existing.adjustment_index ?? "",
      bank: existing.bank ?? "",
      agency: existing.agency ?? "",
      account: existing.account ?? "",
      payment_term: existing.payment_term ?? "",
      budget_unit: existing.budget_unit ?? "",
      work_program: existing.work_program ?? "",
      expense_nature: existing.expense_nature ?? "",
      resource_source: existing.resource_source ?? "",
      delay_penalty: existing.delay_penalty ?? "",
      termination_penalty: existing.termination_penalty ?? "",
      signature_location: existing.signature_location ?? "",
      general_observations: existing.general_observations ?? "",
      status: existing.status ?? "active",
    });
  }, [existing]);

  // Sugere início/vencimento a partir da assinatura + duração
  const signatureDate = form.watch("signature_date");
  const duration = form.watch("duration");
  useEffect(() => {
    if (!signatureDate) return;
    if (!form.getValues("start_date")) {
      form.setValue("start_date", signatureDate, { shouldValidate: false });
    }
    const start = form.getValues("start_date") || signatureDate;
    const months = Number(duration);
    if (start && months > 0) {
      form.setValue("end_date", addMonths(start, months), { shouldValidate: false });
    }
  }, [signatureDate, duration]);

  const optionalId = (value?: string) => (value && value !== NONE ? value : null);
  const optionalText = (value?: string) => (value && value.trim() !== "" ? value.trim() : null);
  const optionalNumber = (value?: string) =>
    value && value.trim() !== "" && !isNaN(Number(value)) ? Number(value) : null;

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const { data: auth } = await supabase.auth.getUser();

      const payload: ContractInsert = {
        contract_number: data.contract_number.trim(),
        object: data.object.trim(),
        contractor_id: data.contractor_id,
        contracted_id: data.contracted_id,
        legal_rep_id: optionalId(data.legal_rep_id),
        witness1_id: optionalId(data.witness1_id),
        witness2_id: optionalId(data.witness2_id),
        total_value: Number(data.total_value.replace(",", ".")),
        duration: Number(data.duration),
        signature_date: data.signature_date,
        publication_date: optionalText(data.publication_date),
        start_date: data.start_date,
        end_date: data.end_date,
        price_adjustment_term: optionalNumber(data.price_adjustment_term),
        adjustment_index: optionalText(data.adjustment_index),
        bank: optionalText(data.bank),
        agency: optionalText(data.agency),
        account: optionalText(data.account),
        payment_term: optionalText(data.payment_term),
        budget_unit: optionalText(data.budget_unit),
        work_program: optionalText(data.work_program),
        expense_nature: optionalText(data.expense_nature),
        resource_source: optionalText(data.resource_source),
        delay_penalty: optionalText(data.delay_penalty),
        termination_penalty: optionalText(data.termination_penalty),
        signature_location: optionalText(data.signature_location),
        general_observations: optionalText(data.general_observations),
        status: data.status,
        created_by: auth?.user?.id ?? null,
      };

      if (isEditing && id) {
        await contractsApi.update(id, payload as any);
        navigate("/contracts");
        return;
      }

      const created = await contractsApi.create(payload);
      if (created?.id) {
        setSavedContractId(created.id);
        toast({
          title: "Contrato cadastrado com sucesso!",
          description: "Agora você pode anexar os documentos do contrato.",
        });
      } else {
        navigate("/contracts");
      }
    } catch (error: any) {
      console.error("Erro ao salvar contrato:", error);
      const duplicated = String(error?.message || "").includes("duplicate key");
      toast({
        title: isEditing ? "Erro ao atualizar contrato" : "Erro ao cadastrar contrato",
        description: duplicated
          ? "Já existe um contrato com esse número."
          : error?.message || "Verifique os dados e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingLegal || loadingPhysical || (isEditing && loadingContract)) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Carregando dados...</span>
      </div>
    );
  }

  const companyLabel = (p: any) =>
    `${p.trade_name || p.company_name}${p.cnpj ? ` — ${p.cnpj}` : ""}`;
  const personLabel = (p: any) => `${p.full_name}${p.cpf ? ` — ${p.cpf}` : ""}`;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-warm-800">
            {isEditing ? "Editar Contrato" : "Cadastro de Contrato"}
          </h2>
        </div>

        {legalPersons.length < 1 && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Cadastre as empresas em <strong>Pessoas Jurídicas</strong> antes de criar um contrato —
              contratante e contratada são selecionados da base.
            </AlertDescription>
          </Alert>
        )}

        <Section title="Identificação do Contrato">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="contract_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Contrato *</FormLabel>
                  <FormControl>
                    <Input placeholder="00001/2026" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Situação *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="finished">Finalizado</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="signature_location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local de Assinatura</FormLabel>
                  <FormControl>
                    <Input placeholder="Boa Vista - RR" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-3">
              <FormField
                control={form.control}
                name="object"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Objeto do Contrato *</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Ex.: Fornecimento de material de escritório..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Section>

        <Section title="Partes do Contrato">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="contractor_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contratante *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a empresa contratante" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {legalPersons.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>
                          {companyLabel(p)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contracted_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contratada *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a empresa contratada" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {legalPersons.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>
                          {companyLabel(p)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legal_rep_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Representante Legal</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={NONE}>Nenhum</SelectItem>
                      {physicalPersons.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>
                          {personLabel(p)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Pessoa física cadastrada no sistema.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Section>

        <Section title="Vigência e Valores">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="total_value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Total (R$) *</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração (meses) *</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="signature_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Assinatura *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Início da Vigência *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vencimento *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>Calculado por início + duração; pode ajustar.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="publication_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Publicação</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_adjustment_term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prazo de Reajuste (meses)</FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="adjustment_index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Índice de Reajuste</FormLabel>
                  <FormControl>
                    <Input placeholder="IPCA, INPC, IGP-M..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Section>

        <Section title="Dados de Pagamento">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <FormField
              control={form.control}
              name="bank"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Banco</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
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
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="account"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conta</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condição de Pagamento</FormLabel>
                  <FormControl>
                    <Input placeholder="Até o 10º dia útil" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Section>

        <Section title="Classificação Orçamentária">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <FormField
              control={form.control}
              name="budget_unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unidade Orçamentária</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="work_program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Programa de Trabalho</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense_nature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Natureza da Despesa</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Serviços">Serviços</SelectItem>
                      <SelectItem value="Suprimentos">Suprimentos</SelectItem>
                      <SelectItem value="Obras">Obras</SelectItem>
                      <SelectItem value="Locação">Locação</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resource_source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fonte do Recurso</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Section>

        <Section title="Penalidades">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="delay_penalty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multa por Atraso</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="termination_penalty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multa por Rescisão</FormLabel>
                  <FormControl>
                    <Textarea rows={2} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </Section>

        <Section title="Testemunhas e Observações">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="witness1_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testemunha 1</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={NONE}>Nenhuma</SelectItem>
                      {physicalPersons.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>
                          {personLabel(p)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="witness2_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testemunha 2</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione (opcional)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={NONE}>Nenhuma</SelectItem>
                      {physicalPersons.map((p: any) => (
                        <SelectItem key={p.id} value={p.id}>
                          {personLabel(p)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="general_observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações Gerais</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </Section>

        <Section title="Documentos do Contrato">
          {savedContractId ? (
            <DocumentUploadComponent
              entityType="contract"
              entityId={savedContractId}
              title="Anexos"
            />
          ) : (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Salve o contrato primeiro para liberar o envio de anexos.
              </AlertDescription>
            </Alert>
          )}
        </Section>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/contracts")}>
            {savedContractId && !isEditing ? "Finalizar e voltar para a lista" : "Cancelar"}
          </Button>
          <Button type="submit" className="gap-2" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> {isEditing ? "Salvar alterações" : "Salvar contrato"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContractForm;
