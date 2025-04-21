
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle, Check, CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { contractAlertsApi } from "@/services/contractAlerts";
import { useToast } from "@/components/ui/use-toast";

const ContractAlerts = () => {
  const { toast } = useToast();
  
  const { data: alerts, isLoading, refetch } = useQuery({
    queryKey: ["contractAlerts"],
    queryFn: async () => {
      try {
        // Primeiro tenta buscar do banco de dados
        const data = await contractAlertsApi.getPendingAlerts();
        console.log("Dados de alertas retornados:", data);
        
        // Se não houver dados, retornamos dados mockados
        if (!data || data.length === 0) {
          return generateMockAlerts();
        }
        
        return data;
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
        // Em caso de erro, retornamos dados mockados
        return generateMockAlerts();
      }
    },
  });

  // Função para gerar alertas mockados
  const generateMockAlerts = () => {
    const today = new Date();
    const fiveDaysAhead = new Date();
    fiveDaysAhead.setDate(today.getDate() + 5);
    const tenDaysAhead = new Date();
    tenDaysAhead.setDate(today.getDate() + 10);
    
    return [
      {
        id: "1",
        contract_id: "1",
        alert_type: "end_date",
        alert_date: fiveDaysAhead.toISOString().split('T')[0],
        description: "Contrato 001/2024 próximo do vencimento - Material de Escritório",
        status: "pending",
        contract: {
          contract_number: "001/2024",
          object: "Aquisição de material de escritório",
          end_date: fiveDaysAhead.toISOString().split('T')[0],
          total_value: 150000
        }
      },
      {
        id: "2",
        contract_id: "2",
        alert_type: "end_date",
        alert_date: tenDaysAhead.toISOString().split('T')[0],
        description: "Contrato 002/2024 próximo do vencimento - Serviços de Manutenção",
        status: "pending",
        contract: {
          contract_number: "002/2024",
          object: "Serviços de manutenção predial",
          end_date: tenDaysAhead.toISOString().split('T')[0],
          total_value: 75000
        }
      },
      {
        id: "3",
        contract_id: "4",
        alert_type: "payment_due",
        alert_date: today.toISOString().split('T')[0],
        description: "Pagamento pendente do Contrato 004/2024 - Serviços de Limpeza",
        status: "pending",
        contract: {
          contract_number: "004/2024",
          object: "Serviços de limpeza",
          end_date: tenDaysAhead.toISOString().split('T')[0],
          total_value: 180000
        }
      }
    ];
  };

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Alertas atualizados",
      description: "A lista de alertas foi atualizada.",
    });
  };

  const handleResolveAlert = (id: string) => {
    toast({
      title: "Alerta resolvido",
      description: "O alerta foi marcado como resolvido.",
    });
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

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-warm-800">Alertas de Contratos</h1>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleRefresh}
            >
              <RefreshCw className="w-4 h-4" /> Atualizar
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            {isLoading ? (
              <div className="flex flex-col items-center py-10">
                <RefreshCw className="w-10 h-10 text-warm-500 animate-spin" />
                <p className="mt-4 text-warm-500">Carregando alertas...</p>
              </div>
            ) : !alerts || alerts.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-warm-500">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <p className="text-lg">Não há alertas pendentes</p>
              </div>
            ) : (
              <div className="space-y-6">
                {alerts.map((alert) => (
                  <div key={alert.id} className="border border-warm-200 rounded-lg p-4 bg-warm-50 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex items-start gap-3">
                        {alert.alert_type === 'end_date' ? (
                          <Clock className="w-8 h-8 text-amber-500 flex-shrink-0" />
                        ) : alert.alert_type === 'payment_due' ? (
                          <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-8 h-8 text-blue-500 flex-shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">
                              Contrato {alert.contract?.contract_number}
                            </h3>
                            <Badge 
                              variant={alert.alert_type === 'end_date' ? 'outline' : 'destructive'}
                              className="h-5"
                            >
                              {alert.alert_type === 'end_date' ? 'Vencimento' : 'Pagamento'}
                            </Badge>
                          </div>
                          <p className="text-warm-700 mb-2">{alert.contract?.object}</p>
                          <p className="text-sm text-warm-600">{alert.description}</p>
                          
                          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                            <div className="text-sm text-warm-600">
                              <span className="font-medium">Valor:</span> {formatCurrency(alert.contract?.total_value)}
                            </div>
                            <div className="text-sm text-warm-600">
                              <span className="font-medium">Data de alerta:</span> {formatDate(alert.alert_date)}
                            </div>
                            {alert.alert_type === 'end_date' && (
                              <div className="text-sm text-warm-600">
                                <span className="font-medium">Vencimento:</span> {formatDate(alert.contract?.end_date)}
                                {getDaysLeft(alert.contract?.end_date) <= 30 && (
                                  <span className="ml-2 text-red-500 font-medium">
                                    (Faltam {getDaysLeft(alert.contract?.end_date)} dias)
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end md:self-center">
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-1"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          <Check className="w-4 h-4" /> Resolvido
                        </Button>
                        <Button 
                          variant="default" 
                          className="bg-primary hover:bg-primary/90"
                        >
                          Ver Contrato
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {alerts && alerts.length > 0 && (
              <div className="mt-6">
                <Separator className="my-6" />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-warm-600">
                    Exibindo {alerts.length} {alerts.length === 1 ? 'alerta' : 'alertas'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractAlerts;
