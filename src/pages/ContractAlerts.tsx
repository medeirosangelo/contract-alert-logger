import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, Check, CheckCircle, RefreshCw, AlertTriangle, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { contractAlertsApi } from "@/services/contractAlerts";
import { useToast } from "@/components/ui/use-toast";
import AlertResolveModal from "@/components/contract/AlertResolveModal";
import ContractViewModal from "@/components/contract/ContractViewModal";

const ContractAlerts = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  
  const { data: allAlerts, isLoading, refetch } = useQuery({
    queryKey: ["contractAlerts"],
    queryFn: async () => {
      try {
        const data = await contractAlertsApi.getAll();
        console.log("Alertas carregados:", data);
        return data || [];
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
        return [];
      }
    },
  });

  const pendingAlerts = allAlerts?.filter(a => a.status === 'pending') || [];
  const resolvedAlerts = allAlerts?.filter(a => a.status === 'resolved') || [];

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Alertas atualizados",
      description: "A lista de alertas foi atualizada.",
    });
  };

  const handleOpenResolveModal = (alert: any) => {
    setSelectedAlert(alert);
    setResolveModalOpen(true);
  };

  const handleOpenViewModal = (alert: any) => {
    setSelectedAlert(alert);
    setViewModalOpen(true);
  };

  const handleResolveAlert = async (action: string, data?: { additionalValue?: number; additionalMonths?: number }) => {
    if (!selectedAlert) return;
    
    try {
      await contractAlertsApi.markAsResolved(selectedAlert.id);
      
      let message = "";
      switch (action) {
        case "aditivo":
          message = `Aditivo registrado: +R$ ${data?.additionalValue?.toLocaleString('pt-BR')} por ${data?.additionalMonths} meses`;
          break;
        case "finalizar":
          message = "Contrato marcado para finalização";
          break;
        case "cancelar":
          message = "Contrato marcado para cancelamento";
          break;
      }
      
      toast({
        title: "Alerta Resolvido",
        description: message,
      });
      
      refetch();
    } catch (error) {
      console.error("Erro ao resolver alerta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível resolver o alerta",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getDaysLeft = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(dateString);
    endDate.setHours(0, 0, 0, 0);
    
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const getAlertPriority = (daysLeft: number) => {
    if (daysLeft <= 30) return { color: 'text-red-600 bg-red-50 border-red-200', label: 'Alta', icon: AlertCircle };
    if (daysLeft <= 60) return { color: 'text-orange-600 bg-orange-50 border-orange-200', label: 'Média', icon: AlertTriangle };
    return { color: 'text-green-600 bg-green-50 border-green-200', label: 'Baixa', icon: Clock };
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
              <p className="text-warm-600">Monitoramento automático de vencimentos e pendências</p>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleRefresh}
            >
              <RefreshCw className="w-4 h-4" /> Atualizar
            </Button>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium mb-1">Alertas Críticos</p>
                  <p className="text-3xl font-bold text-red-700">
                    {pendingAlerts.filter(a => a.contract?.end_date && getDaysLeft(a.contract.end_date) <= 30).length}
                  </p>
                </div>
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium mb-1">Alertas Pendentes</p>
                  <p className="text-3xl font-bold text-orange-700">{pendingAlerts.length}</p>
                </div>
                <Clock className="w-10 h-10 text-orange-500" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium mb-1">Alertas Resolvidos</p>
                  <p className="text-3xl font-bold text-green-700">{resolvedAlerts.length}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-warm-800 mb-4">Alertas Pendentes</h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center py-10">
                <RefreshCw className="w-10 h-10 text-warm-500 animate-spin" />
                <p className="mt-4 text-warm-500">Carregando alertas...</p>
              </div>
            ) : pendingAlerts.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-warm-500">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-lg">Não há alertas pendentes</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingAlerts.map((alert) => {
                  const daysLeft = alert.contract?.end_date ? getDaysLeft(alert.contract.end_date) : 0;
                  const priority = getAlertPriority(daysLeft);
                  const PriorityIcon = priority.icon;
                  
                  return (
                    <div key={alert.id} className={`border-2 rounded-lg p-5 ${priority.color} hover:shadow-lg transition-all duration-200`}>
                      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <PriorityIcon className="w-10 h-10 flex-shrink-0 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">
                                Contrato {alert.contract?.contract_number}
                              </h3>
                              <Badge 
                                variant="outline"
                                className={`font-semibold ${priority.color}`}
                              >
                                Prioridade {priority.label}
                              </Badge>
                            </div>
                            <p className="text-base font-medium mb-2">{alert.contract?.object}</p>
                            <p className="text-sm mb-3">{alert.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">Valor Total:</span>
                                <span className="text-lg font-bold">{formatCurrency(alert.contract?.total_value || 0)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">Data do Alerta:</span>
                                <span>{formatDate(alert.alert_date)}</span>
                              </div>
                              {alert.contract?.end_date && (
                                <>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">Vencimento:</span>
                                    <span>{formatDate(alert.contract.end_date)}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold">Dias Restantes:</span>
                                    <span className={`text-lg font-bold ${
                                      daysLeft <= 30 ? 'text-red-600' : 
                                      daysLeft <= 60 ? 'text-orange-600' : 
                                      'text-green-600'
                                    }`}>
                                      {daysLeft} dias
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2"
                            onClick={() => handleOpenViewModal(alert)}
                          >
                            <Eye className="w-4 h-4" /> Ver Contrato
                          </Button>
                          <Button 
                            variant="default" 
                            className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                            onClick={() => handleOpenResolveModal(alert)}
                          >
                            <Check className="w-4 h-4" /> Resolver
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {pendingAlerts.length > 0 && (
              <div className="mt-6">
                <Separator className="my-6" />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-warm-600">
                    Exibindo {pendingAlerts.length} {pendingAlerts.length === 1 ? 'alerta pendente' : 'alertas pendentes'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Alertas Resolvidos */}
          {resolvedAlerts.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-warm-800 mb-4">Alertas Resolvidos</h2>
              <div className="space-y-3">
                {resolvedAlerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="border border-green-200 rounded-lg p-4 bg-green-50/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <div>
                          <p className="font-semibold">Contrato {alert.contract?.contract_number}</p>
                          <p className="text-sm text-warm-600">{alert.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        Resolvido
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de Resolução */}
      {selectedAlert && (
        <AlertResolveModal
          isOpen={resolveModalOpen}
          onClose={() => setResolveModalOpen(false)}
          onResolve={handleResolveAlert}
          contractNumber={selectedAlert.contract?.contract_number || ""}
          contractValue={selectedAlert.contract?.total_value || 0}
          endDate={selectedAlert.contract?.end_date || ""}
        />
      )}

      {/* Modal de Visualização */}
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
