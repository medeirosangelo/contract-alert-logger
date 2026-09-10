import { useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  AlertCircle,
  Check,
  CheckCircle,
  RefreshCw,
  AlertTriangle,
  Eye,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { contractAlertsApi } from "@/services/contractAlerts";
import {
  alertResolutionsApi,
  actionLabel,
  type AlertResolution,
  type ResolutionAction,
} from "@/services/alertResolutions";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import AlertResolveModal from "@/components/contract/AlertResolveModal";
import AlertReviewModal from "@/components/contract/AlertReviewModal";
import ContractViewModal from "@/components/contract/ContractViewModal";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);

const formatDate = (dateString?: string | null) =>
  dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "-";

const getDaysLeft = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(dateString);
  endDate.setHours(0, 0, 0, 0);
  return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getAlertPriority = (daysLeft: number) => {
  if (daysLeft <= 30)
    return { color: "border-destructive/40 bg-destructive/5", label: "Alta", icon: AlertCircle };
  if (daysLeft <= 60)
    return { color: "border-orange-300 bg-orange-50", label: "Média", icon: AlertTriangle };
  return { color: "border-border bg-card", label: "Baixa", icon: Clock };
};

const ContractAlerts = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [selectedResolution, setSelectedResolution] = useState<AlertResolution | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: allAlerts = [], isLoading, refetch } = useQuery({
    queryKey: ["contractAlerts"],
    queryFn: async () => (await contractAlertsApi.getAll()) || [],
  });

  const { data: resolutions = [], refetch: refetchResolutions } = useQuery({
    queryKey: ["alertResolutions"],
    queryFn: alertResolutionsApi.getAll,
  });

  const pendingResolutionByAlert = useMemo(() => {
    const map = new Map<string, AlertResolution>();
    resolutions
      .filter((r) => r.status === "pending_approval")
      .forEach((r) => {
        if (!map.has(r.alert_id)) map.set(r.alert_id, r);
      });
    return map;
  }, [resolutions]);

  const historyByAlert = useMemo(() => {
    const map = new Map<string, AlertResolution>();
    resolutions
      .filter((r) => r.status !== "pending_approval")
      .forEach((r) => {
        if (!map.has(r.alert_id)) map.set(r.alert_id, r);
      });
    return map;
  }, [resolutions]);

  const pendingAlerts = allAlerts.filter(
    (a: any) => a.status === "pending" && !pendingResolutionByAlert.has(a.id)
  );
  const inReviewAlerts = allAlerts.filter((a: any) => pendingResolutionByAlert.has(a.id));
  const resolvedAlerts = allAlerts.filter((a: any) => a.status === "resolved");

  const reload = () => {
    refetch();
    refetchResolutions();
  };

  const handleRefresh = () => {
    reload();
    toast({ title: "Alertas atualizados", description: "A lista de alertas foi atualizada." });
  };

  const handleRequestResolution = async (data: {
    action: ResolutionAction;
    additionalValue: number;
    additionalMonths: number;
    justification: string;
  }) => {
    if (!selectedAlert) return;
    setIsSubmitting(true);
    try {
      await alertResolutionsApi.request({
        alertId: selectedAlert.id,
        contractId: selectedAlert.contract?.id ?? selectedAlert.contract_id ?? null,
        ...data,
      });
      toast({
        title: "Pedido enviado para conferência",
        description: "Outra pessoa do sistema precisa aprovar para a resolução valer.",
      });
      setResolveModalOpen(false);
      reload();
    } catch (error: any) {
      toast({
        title: "Não foi possível enviar o pedido",
        description: error?.message || "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDecide = async (approve: boolean, notes: string) => {
    if (!selectedResolution) return;
    setIsSubmitting(true);
    try {
      await alertResolutionsApi.review({ resolution: selectedResolution, approve, notes });
      toast({
        title: approve ? "Pedido aprovado" : "Pedido recusado",
        description: approve
          ? "A resolução foi aplicada ao contrato."
          : "O alerta voltou para a lista de pendentes.",
      });
      setReviewModalOpen(false);
      reload();
    } catch (error: any) {
      toast({
        title: "Não foi possível registrar a decisão",
        description: error?.message || "Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openResolve = (alert: any) => {
    setSelectedAlert(alert);
    setResolveModalOpen(true);
  };

  const openReview = (alert: any) => {
    setSelectedAlert(alert);
    setSelectedResolution(pendingResolutionByAlert.get(alert.id) ?? null);
    setReviewModalOpen(true);
  };

  const openView = (alert: any) => {
    setSelectedAlert(alert);
    setViewModalOpen(true);
  };

  const criticalCount = pendingAlerts.filter(
    (a: any) => a.contract?.end_date && getDaysLeft(a.contract.end_date) <= 30
  ).length;

  const renderAlertCard = (alert: any, mode: "pending" | "review") => {
    const daysLeft = alert.contract?.end_date ? getDaysLeft(alert.contract.end_date) : 0;
    const priority = getAlertPriority(daysLeft);
    const PriorityIcon = priority.icon;
    const resolution = pendingResolutionByAlert.get(alert.id);
    const isOwnRequest = !!resolution && resolution.requested_by === user?.id;

    return (
      <div
        key={alert.id}
        className={`border rounded-lg p-5 ${priority.color} hover:shadow-md transition-all duration-200`}
      >
        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
          <div className="flex items-start gap-4 flex-1">
            <PriorityIcon className="w-8 h-8 flex-shrink-0 mt-1 text-muted-foreground" />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="text-lg font-bold">Contrato {alert.contract?.contract_number}</h3>
                <Badge variant="outline">Prioridade {priority.label}</Badge>
                {mode === "review" && (
                  <Badge variant="secondary" className="gap-1">
                    <UserCheck className="w-3 h-3" /> Aguardando conferência
                  </Badge>
                )}
              </div>
              <p className="text-base font-medium mb-1">{alert.contract?.object}</p>
              <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <p>
                  <span className="font-semibold">Valor total: </span>
                  {formatCurrency(alert.contract?.total_value)}
                </p>
                <p>
                  <span className="font-semibold">Data do alerta: </span>
                  {formatDate(alert.alert_date)}
                </p>
                <p>
                  <span className="font-semibold">Vencimento: </span>
                  {formatDate(alert.contract?.end_date)}
                </p>
                <p>
                  <span className="font-semibold">Dias restantes: </span>
                  {daysLeft} dias
                </p>
              </div>

              {mode === "review" && resolution && (
                <div className="mt-3 rounded-lg border bg-background/70 p-3 text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Ação pedida: </span>
                    {actionLabel(resolution.action)}
                    {resolution.action === "aditivo" &&
                      ` · ${formatCurrency(resolution.additional_value)} · +${resolution.additional_months} meses`}
                  </p>
                  <p>
                    <span className="font-semibold">Solicitante: </span>
                    {resolution.requested_by_name || "não identificado"} em{" "}
                    {new Date(resolution.requested_at).toLocaleString("pt-BR")}
                  </p>
                  <p className="text-muted-foreground">{resolution.justification}</p>
                  {isOwnRequest && (
                    <p className="text-destructive font-medium">
                      Você é o solicitante — outra pessoa precisa conferir.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" className="gap-2" onClick={() => openView(alert)}>
              <Eye className="w-4 h-4" /> Ver contrato
            </Button>
            {mode === "pending" ? (
              <Button className="gap-2" onClick={() => openResolve(alert)}>
                <Check className="w-4 h-4" /> Solicitar resolução
              </Button>
            ) : (
              <Button
                variant={isOwnRequest ? "outline" : "default"}
                className="gap-2"
                onClick={() => openReview(alert)}
              >
                <ShieldCheck className="w-4 h-4" /> {isOwnRequest ? "Ver pedido" : "Conferir"}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-warm-800 mb-2">Alertas de Contratos</h1>
              <p className="text-warm-600">
                Monitoramento de vencimentos com conferência de duas pessoas antes de resolver
              </p>
            </div>
            <Button variant="outline" className="gap-2" onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4" /> Atualizar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-destructive mb-1">Críticos (30 dias)</p>
                <p className="text-3xl font-bold text-destructive">{criticalCount}</p>
              </div>
              <AlertCircle className="w-9 h-9 text-destructive" />
            </div>
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700 mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-orange-700">{pendingAlerts.length}</p>
              </div>
              <Clock className="w-9 h-9 text-orange-500" />
            </div>
            <div className="rounded-lg border bg-card p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Em conferência</p>
                <p className="text-3xl font-bold">{inReviewAlerts.length}</p>
              </div>
              <UserCheck className="w-9 h-9 text-muted-foreground" />
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 mb-1">Resolvidos</p>
                <p className="text-3xl font-bold text-green-700">{resolvedAlerts.length}</p>
              </div>
              <CheckCircle className="w-9 h-9 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            {isLoading ? (
              <div className="flex flex-col items-center py-10">
                <RefreshCw className="w-10 h-10 text-warm-500 animate-spin" />
                <p className="mt-4 text-warm-500">Carregando alertas...</p>
              </div>
            ) : (
              <Tabs defaultValue="pending">
                <TabsList className="mb-4">
                  <TabsTrigger value="pending">Pendentes ({pendingAlerts.length})</TabsTrigger>
                  <TabsTrigger value="review">Em conferência ({inReviewAlerts.length})</TabsTrigger>
                  <TabsTrigger value="resolved">Resolvidos ({resolvedAlerts.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                  {pendingAlerts.length === 0 ? (
                    <div className="flex flex-col items-center py-10 text-warm-500">
                      <CheckCircle className="w-14 h-14 text-green-500 mb-3" />
                      <p className="text-lg">Não há alertas pendentes</p>
                    </div>
                  ) : (
                    pendingAlerts.map((alert: any) => renderAlertCard(alert, "pending"))
                  )}
                </TabsContent>

                <TabsContent value="review" className="space-y-4">
                  {inReviewAlerts.length === 0 ? (
                    <div className="flex flex-col items-center py-10 text-warm-500">
                      <ShieldCheck className="w-14 h-14 text-muted-foreground mb-3" />
                      <p className="text-lg">Nenhum pedido aguardando conferência</p>
                    </div>
                  ) : (
                    inReviewAlerts.map((alert: any) => renderAlertCard(alert, "review"))
                  )}
                </TabsContent>

                <TabsContent value="resolved" className="space-y-3">
                  {resolvedAlerts.length === 0 ? (
                    <div className="flex flex-col items-center py-10 text-warm-500">
                      <p className="text-lg">Nenhum alerta resolvido ainda</p>
                    </div>
                  ) : (
                    resolvedAlerts.map((alert: any) => {
                      const decision = historyByAlert.get(alert.id);
                      return (
                        <div key={alert.id} className="border border-green-200 rounded-lg p-4 bg-green-50/50">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                              <div className="text-sm">
                                <p className="font-semibold">
                                  Contrato {alert.contract?.contract_number}
                                </p>
                                <p className="text-warm-600">{alert.description}</p>
                                {decision && (
                                  <div className="mt-2 space-y-0.5 text-warm-600">
                                    <p>
                                      <span className="font-medium">Ação: </span>
                                      {actionLabel(decision.action)}
                                    </p>
                                    <p>
                                      <span className="font-medium">Solicitado por: </span>
                                      {decision.requested_by_name || "-"}
                                    </p>
                                    <p>
                                      <span className="font-medium">Conferido por: </span>
                                      {decision.reviewed_by_name || "-"}
                                      {decision.reviewed_at &&
                                        ` em ${new Date(decision.reviewed_at).toLocaleString("pt-BR")}`}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                                Resolvido
                              </Badge>
                              <Button variant="outline" size="sm" className="gap-2" onClick={() => openView(alert)}>
                                <Eye className="w-4 h-4" /> Ver contrato
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>

      {selectedAlert && (
        <AlertResolveModal
          isOpen={resolveModalOpen}
          onClose={() => setResolveModalOpen(false)}
          onResolve={handleRequestResolution}
          isSubmitting={isSubmitting}
          contractNumber={selectedAlert.contract?.contract_number || ""}
          contractValue={selectedAlert.contract?.total_value || 0}
          endDate={selectedAlert.contract?.end_date || ""}
        />
      )}

      <AlertReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        resolution={selectedResolution}
        contractNumber={selectedAlert?.contract?.contract_number || ""}
        isSameRequester={selectedResolution?.requested_by === user?.id}
        isSubmitting={isSubmitting}
        onDecide={handleDecide}
      />

      {selectedAlert && (
        <ContractViewModal
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          contract={selectedAlert.contract}
        />
      )}
    </div>
  );
};

export default ContractAlerts;
