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

interface Contract {
  id: number;
  contractNumber: string;
  companyName: string;
  expirationDate: string;
  daysUntilExpiration: number;
  status: "pending" | "renewed" | "finished";
  currentValue: number;
}

const fetchContractAlerts = async (): Promise<Contract[]> => {
  console.log("Fetching contract alerts...");
  return [
    {
      id: 1,
      contractNumber: "2024/001",
      companyName: "Tech Solutions Ltd",
      expirationDate: "2024-03-15",
      daysUntilExpiration: 15,
      status: "pending",
      currentValue: 150000,
    },
    {
      id: 2,
      contractNumber: "2024/002",
      companyName: "Marketing Pro Inc",
      expirationDate: "2024-03-30",
      daysUntilExpiration: 30,
      status: "pending",
      currentValue: 75000,
    },
    {
      id: 3,
      contractNumber: "2024/003",
      companyName: "Global Services SA",
      expirationDate: "2024-04-15",
      daysUntilExpiration: 45,
      status: "pending",
      currentValue: 200000,
    },
    {
      id: 4,
      contractNumber: "2024/004",
      companyName: "Consultoria XYZ",
      expirationDate: "2024-05-01",
      daysUntilExpiration: 60,
      status: "pending",
      currentValue: 180000,
    },
    {
      id: 5,
      contractNumber: "2024/005",
      companyName: "Manutenção ABC",
      expirationDate: "2024-06-15",
      daysUntilExpiration: 90,
      status: "pending",
      currentValue: 95000,
    },
    {
      id: 6,
      contractNumber: "2024/006",
      companyName: "Serviços Gerais Ltda",
      expirationDate: "2024-07-01",
      daysUntilExpiration: 105,
      status: "pending",
      currentValue: 120000,
    },
    {
      id: 7,
      contractNumber: "2024/007",
      companyName: "Limpeza & Cia",
      expirationDate: "2024-07-15",
      daysUntilExpiration: 120,
      status: "pending",
      currentValue: 85000,
    },
    {
      id: 8,
      contractNumber: "2024/008",
      companyName: "Segurança Total",
      expirationDate: "2024-08-01",
      daysUntilExpiration: 135,
      status: "pending",
      currentValue: 250000,
    },
  ].sort((a, b) => a.daysUntilExpiration - b.daysUntilExpiration);
};

interface RenewalFormData {
  newExpirationDate: string;
  newValue: number;
}

const ContractAlerts = () => {
  const { toast } = useToast();
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [renewalData, setRenewalData] = useState<RenewalFormData>({
    newExpirationDate: "",
    newValue: 0,
  });

  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contractAlerts"],
    queryFn: fetchContractAlerts,
  });

  const handleRenewal = () => {
    console.log("Renewing contract with data:", renewalData);
    toast({
      title: "Contrato renovado com sucesso!",
      description: `O contrato ${selectedContract?.contractNumber} foi renovado até ${renewalData.newExpirationDate}`,
    });
    setSelectedContract(null);
  };

  const handleFinish = (contractId: number) => {
    console.log("Finishing contract:", contractId);
    toast({
      title: "Contrato finalizado",
      description: "O contrato foi marcado como finalizado.",
    });
  };

  const getAlertVariant = (days: number) => {
    if (days <= 30) return "bg-red-100 border-red-500 text-red-800";
    if (days <= 60) return "bg-orange-100 border-orange-500 text-orange-800";
    return "bg-green-100 border-green-500 text-green-800";
  };

  const getAlertIcon = (days: number) => {
    if (days <= 30) return <AlertTriangle className="h-5 w-5 text-red-500" />;
    if (days <= 60) return <Clock className="h-5 w-5 text-orange-500" />;
    return <Check className="h-5 w-5 text-green-500" />;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-warm-900">Alertas de Contratos</h2>
          
          <div className="space-y-4">
            {contracts?.map((contract) => (
              <Alert
                key={contract.id}
                className={`${getAlertVariant(contract.daysUntilExpiration)} border-l-4`}
              >
                <div className="flex items-start">
                  {getAlertIcon(contract.daysUntilExpiration)}
                  <div className="ml-3 flex-1">
                    <AlertTitle className="text-lg font-semibold">
                      Contrato {contract.contractNumber} - {contract.companyName}
                    </AlertTitle>
                    <AlertDescription className="mt-2">
                      <p className="mb-2">
                        {contract.daysUntilExpiration} dias para a expiração deste contrato
                        (vence em {new Date(contract.expirationDate).toLocaleDateString()})
                      </p>
                      <p className="mb-2">
                        Valor atual: {contract.currentValue.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
                      </p>
                      {contract.status === "pending" && (
                        <div className="flex gap-3 mt-3">
                          <Button
                            variant="outline"
                            onClick={() => setSelectedContract(contract)}
                            className="bg-green-500 text-white hover:bg-green-600"
                          >
                            Renovar Contrato
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleFinish(contract.id)}
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
            ))}
          </div>
        </div>
      </main>

      <Dialog open={!!selectedContract} onOpenChange={() => setSelectedContract(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renovar Contrato {selectedContract?.contractNumber}</DialogTitle>
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
            <Button variant="outline" onClick={() => setSelectedContract(null)}>
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