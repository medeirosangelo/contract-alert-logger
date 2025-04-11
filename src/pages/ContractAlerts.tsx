
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Check, Clock, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { contractAlertsApi } from "@/services/contractAlerts";
import { contractsApi } from "@/services/contracts";

const ContractAlerts = () => {
  const { toast } = useToast();
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [renewalData, setRenewalData] = useState({
    newExpirationDate: "",
    newValue: 0,
  });

  // Fetch all contract alerts
  const { data: alerts, isLoading: isLoadingAlerts, refetch: refetchAlerts } = useQuery({
    queryKey: ["contractAlerts"],
    queryFn: contractAlertsApi.getPending,
  });

  // Fetch the selected contract details when a contract is selected
  const { data: selectedContract } = useQuery({
    queryKey: ["contract", selectedContractId],
    queryFn: () => selectedContractId ? contractsApi.getById(selectedContractId) : null,
    enabled: !!selectedContractId
  });

  const handleRenewal = async () => {
    if (!selectedContract || !selectedContractId) return;
    
    try {
      // Calculate new end date based on the contract start date and the new duration
      const startDate = new Date(selectedContract.start_date);
      const newEndDate = new Date(renewalData.newExpirationDate);
      
      // Calculate duration in days
      const durationInDays = Math.floor((newEndDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Update the contract with new end date, duration, and value
      await contractsApi.update(selectedContractId, {
        end_date: renewalData.newExpirationDate,
        duration: durationInDays,
        total_value: renewalData.newValue
      });
      
      // Mark the alert as resolved
      const alert = alerts?.find(a => a.contract_id === selectedContractId);
      if (alert) {
        await contractAlertsApi.markAsResolved(alert.id);
      }
      
      toast({
        title: "Contrato renovado com sucesso!",
        description: `O contrato foi renovado até ${renewalData.newExpirationDate}`,
      });
      
      // Refetch alerts to update the list
      refetchAlerts();
      setSelectedContractId(null);
    } catch (error) {
      console.error("Error renewing contract:", error);
      toast({
        title: "Erro ao renovar contrato",
        description: "Ocorreu um erro ao tentar renovar o contrato.",
        variant: "destructive",
      });
    }
  };

  const handleFinishContract = async (alertId: string, contractId: string) => {
    try {
      // Update contract status to "finished"
      await contractsApi.update(contractId, { status: "finished" });
      
      // Mark alert as resolved
      await contractAlertsApi.markAsResolved(alertId);
      
      toast({
        title: "Contrato finalizado",
        description: "O contrato foi marcado como finalizado.",
      });
      
      // Refetch alerts to update the list
      refetchAlerts();
    } catch (error) {
      console.error("Error finishing contract:", error);
      toast({
        title: "Erro ao finalizar contrato",
        description: "Ocorreu um erro ao tentar finalizar o contrato.",
        variant: "destructive",
      });
    }
  };

  const getAlertVariant = (alertDate: string) => {
    const days = Math.floor((new Date(alertDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 30) return "bg-red-100 border-red-500 text-red-800";
    if (days <= 60) return "bg-orange-100 border-orange-500 text-orange-800";
    return "bg-green-100 border-green-500 text-green-800";
  };

  const getAlertIcon = (alertDate: string) => {
    const days = Math.floor((new Date(alertDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days <= 30) return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (days <= 60) return <Clock className="h-5 w-5 text-orange-500" />;
    return <Check className="h-5 w-5 text-green-500" />;
  };

  const getDaysUntilExpiration = (endDate: string) => {
    return Math.floor((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  };

  if (isLoadingAlerts) {
    return (
      <div className="min-h-screen bg-warm-50">
        <Navigation />
        <Header />
        <main className="ml-64 pt-16 p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-lg">Carregando alertas de contratos...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-warm-900">Alertas de Contratos</h2>
          
          {alerts && alerts.length > 0 ? (
            <div className="space-y-4">
              {alerts.map((alert) => {
                if (!alert.contract) return null;
                
                const contract = alert.contract;
                const daysUntilExpiration = getDaysUntilExpiration(contract.end_date);
                
                return (
                  <Alert
                    key={alert.id}
                    className={`${getAlertVariant(contract.end_date)} border-l-4`}
                  >
                    <div className="flex items-start">
                      {getAlertIcon(contract.end_date)}
                      <div className="ml-3 flex-1">
                        <AlertTitle className="text-lg font-semibold">
                          Contrato {contract.contract_number} - {contract.object}
                        </AlertTitle>
                        <AlertDescription className="mt-2">
                          <p className="mb-2">
                            {daysUntilExpiration} dias para a expiração deste contrato
                            (vence em {new Date(contract.end_date).toLocaleDateString()})
                          </p>
                          {contract.total_value && (
                            <p className="mb-2">
                              Valor atual: {Number(contract.total_value).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                              })}
                            </p>
                          )}
                          {alert.status === "pending" && (
                            <div className="flex gap-3 mt-3">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedContractId(contract.id)}
                                className="bg-green-500 text-white hover:bg-green-600"
                              >
                                Renovar Contrato
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => handleFinishContract(alert.id, contract.id)}
                                className="bg-red-500 text-white hover:bg-red-600"
                              >
                                Finalizar Contrato
                              </Button>
                            </div>
                          )}
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p>Nenhum alerta de contrato pendente encontrado.</p>
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selectedContractId} onOpenChange={() => setSelectedContractId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Renovar Contrato {selectedContract?.contract_number}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nova Data de Vencimento</label>
              <Input
                type="date"
                value={renewalData.newExpirationDate}
                onChange={(e) => setRenewalData(prev => ({
                  ...prev,
                  newExpirationDate: e.target.value
                }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Novo Valor do Contrato</label>
              <Input
                type="number"
                value={renewalData.newValue}
                onChange={(e) => setRenewalData(prev => ({
                  ...prev,
                  newValue: Number(e.target.value)
                }))}
                placeholder="Digite o novo valor"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedContractId(null)}>
              Cancelar
            </Button>
            <Button onClick={handleRenewal}>
              Confirmar Renovação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContractAlerts;
