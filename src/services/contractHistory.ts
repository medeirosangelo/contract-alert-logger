import { supabase } from "@/integrations/supabase/client";

export interface ContractHistoryEntry {
  id: string;
  contract_id: string;
  field_name: string;
  old_value: string | null;
  new_value: string | null;
  changed_by: string | null;
  changed_by_name: string | null;
  created_at: string;
}

const FIELD_LABELS: Record<string, string> = {
  contract_number: "Número do contrato",
  object: "Objeto",
  total_value: "Valor total",
  duration: "Duração (meses)",
  start_date: "Data de início",
  end_date: "Data de vencimento",
  signature_date: "Data de assinatura",
  publication_date: "Data de publicação",
  status: "Situação",
  general_observations: "Observações gerais",
  payment_term: "Forma de pagamento",
  adjustment_index: "Índice de reajuste",
  bank: "Banco",
  agency: "Agência",
  account: "Conta",
};

export const fieldLabel = (field: string) => FIELD_LABELS[field] || field;

const normalize = (value: unknown) => {
  if (value === null || value === undefined || value === "") return "";
  return String(value);
};

export const contractHistoryApi = {
  async logChanges(
    contractId: string,
    before: Record<string, unknown>,
    after: Record<string, unknown>
  ) {
    try {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth?.user;

      const rows = Object.keys(after)
        .filter((key) => normalize(before?.[key]) !== normalize(after[key]))
        .map((key) => ({
          contract_id: contractId,
          field_name: key,
          old_value: normalize(before?.[key]) || null,
          new_value: normalize(after[key]) || null,
          changed_by: user?.id ?? null,
          changed_by_name:
            (user?.user_metadata?.name as string) || user?.email || null,
        }));

      if (rows.length === 0) return;

      const { error } = await supabase.from("contract_history" as any).insert(rows);
      if (error) console.error("Erro ao registrar histórico:", error);
    } catch (error) {
      console.error("Erro ao registrar histórico:", error);
    }
  },

  async getHistory(contractId: string): Promise<ContractHistoryEntry[]> {
    const { data, error } = await supabase
      .from("contract_history" as any)
      .select("*")
      .eq("contract_id", contractId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar histórico:", error);
      return [];
    }
    return (data || []) as unknown as ContractHistoryEntry[];
  },
};
