import { supabase } from "@/integrations/supabase/client";

export type ResolutionAction = "aditivo" | "finalizar" | "cancelar";

export interface AlertResolution {
  id: string;
  alert_id: string;
  contract_id: string | null;
  action: ResolutionAction;
  additional_value: number;
  additional_months: number;
  justification: string;
  status: "pending_approval" | "approved" | "rejected";
  requested_by: string | null;
  requested_by_name: string | null;
  requested_at: string;
  reviewed_by: string | null;
  reviewed_by_name: string | null;
  reviewed_at: string | null;
  review_notes: string | null;
  created_at: string;
  updated_at: string;
}

export const actionLabel = (action: ResolutionAction) => {
  switch (action) {
    case "aditivo":
      return "Termo aditivo";
    case "finalizar":
      return "Finalizar contrato";
    case "cancelar":
      return "Cancelar contrato";
    default:
      return action;
  }
};

const currentUser = async () => {
  const { data } = await supabase.auth.getUser();
  const user = data?.user;
  const name =
    (user?.user_metadata as any)?.name || user?.email || "Usuário do sistema";
  return { id: user?.id ?? null, name };
};

export const alertResolutionsApi = {
  async getAll(): Promise<AlertResolution[]> {
    const { data, error } = await supabase
      .from("alert_resolutions" as any)
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao carregar pedidos de resolução:", error);
      return [];
    }
    return (data || []) as unknown as AlertResolution[];
  },

  async request(input: {
    alertId: string;
    contractId: string | null;
    action: ResolutionAction;
    additionalValue: number;
    additionalMonths: number;
    justification: string;
  }): Promise<AlertResolution> {
    const user = await currentUser();
    if (!user.id) throw new Error("Sessão expirada. Entre novamente no sistema.");

    const { data, error } = await supabase
      .from("alert_resolutions" as any)
      .insert({
        alert_id: input.alertId,
        contract_id: input.contractId,
        action: input.action,
        additional_value: input.action === "aditivo" ? input.additionalValue : 0,
        additional_months: input.action === "aditivo" ? input.additionalMonths : 0,
        justification: input.justification.trim(),
        status: "pending_approval",
        requested_by: user.id,
        requested_by_name: user.name,
      } as any)
      .select()
      .single();

    if (error) throw error;

    // O alerta passa a aguardar a conferência de outra pessoa
    await supabase
      .from("contract_alerts")
      .update({ status: "in_review" } as any)
      .eq("id", input.alertId);

    return data as unknown as AlertResolution;
  },

  async review(input: {
    resolution: AlertResolution;
    approve: boolean;
    notes: string;
  }): Promise<void> {
    const user = await currentUser();
    if (!user.id) throw new Error("Sessão expirada. Entre novamente no sistema.");
    if (user.id === input.resolution.requested_by) {
      throw new Error(
        "Quem solicitou não pode conferir o próprio pedido. É necessária a ciência de outra pessoa."
      );
    }

    const { error } = await supabase
      .from("alert_resolutions" as any)
      .update({
        status: input.approve ? "approved" : "rejected",
        reviewed_by: user.id,
        reviewed_by_name: user.name,
        reviewed_at: new Date().toISOString(),
        review_notes: input.notes.trim() || null,
      } as any)
      .eq("id", input.resolution.id);

    if (error) throw error;

    if (!input.approve) {
      await supabase
        .from("contract_alerts")
        .update({ status: "pending" } as any)
        .eq("id", input.resolution.alert_id);
      return;
    }

    await supabase
      .from("contract_alerts")
      .update({ status: "resolved" } as any)
      .eq("id", input.resolution.alert_id);

    // Aplica o efeito da decisão no contrato
    if (!input.resolution.contract_id) return;

    if (input.resolution.action === "finalizar") {
      await supabase
        .from("contracts")
        .update({ status: "finished" } as any)
        .eq("id", input.resolution.contract_id);
      return;
    }

    if (input.resolution.action === "cancelar") {
      await supabase
        .from("contracts")
        .update({ status: "cancelled" } as any)
        .eq("id", input.resolution.contract_id);
      return;
    }

    // Aditivo: soma valor e estende o prazo
    const { data: contract } = await supabase
      .from("contracts")
      .select("total_value, duration, end_date")
      .eq("id", input.resolution.contract_id)
      .maybeSingle();

    if (!contract) return;

    const newEnd = new Date(contract.end_date);
    newEnd.setMonth(newEnd.getMonth() + (input.resolution.additional_months || 0));

    await supabase
      .from("contracts")
      .update({
        total_value:
          Number(contract.total_value || 0) + Number(input.resolution.additional_value || 0),
        duration:
          Number(contract.duration || 0) + Number(input.resolution.additional_months || 0),
        end_date: newEnd.toISOString().slice(0, 10),
      } as any)
      .eq("id", input.resolution.contract_id);
  },
};
