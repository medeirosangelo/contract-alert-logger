import { useQuery } from "@tanstack/react-query";
import { Check, Clock, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

interface Contract {
  id: number;
  contractNumber: string;
  companyName: string;
  expirationDate: string;
  daysUntilExpiration: number;
  status: "pending" | "renewed" | "finished";
}

// This will be replaced by the actual API call to Django backend
const fetchContractAlerts = async (): Promise<Contract[]> => {
  console.log("Fetching contract alerts...");
  // Mock data for demonstration
  return [
    {
      id: 1,
      contractNumber: "2024/001",
      companyName: "Tech Solutions Ltd",
      expirationDate: "2024-06-15",
      daysUntilExpiration: 120,
      status: "pending",
    },
    {
      id: 2,
      contractNumber: "2024/002",
      companyName: "Marketing Pro Inc",
      expirationDate: "2024-04-30",
      daysUntilExpiration: 60,
      status: "pending",
    },
    {
      id: 3,
      contractNumber: "2024/003",
      companyName: "Global Services SA",
      expirationDate: "2024-03-15",
      daysUntilExpiration: 30,
      status: "pending",
    },
  ];
};

const getAlertVariant = (days: number) => {
  if (days > 90) return "bg-green-100 border-green-500 text-green-800";
  if (days > 45) return "bg-orange-100 border-orange-500 text-orange-800";
  return "bg-red-100 border-red-500 text-red-800";
};

const getAlertIcon = (days: number) => {
  if (days > 90) return <Check className="h-5 w-5 text-green-500" />;
  if (days > 45) return <Clock className="h-5 w-5 text-orange-500" />;
  return <AlertTriangle className="h-5 w-5 text-red-500" />;
};

const ContractAlerts = () => {
  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contractAlerts"],
    queryFn: fetchContractAlerts,
  });

  console.log("Contract alerts data:", contracts);

  const handleRenew = (contractId: number) => {
    console.log("Renewing contract:", contractId);
    // Will be implemented with Django backend
  };

  const handleFinish = (contractId: number) => {
    console.log("Finishing contract:", contractId);
    // Will be implemented with Django backend
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
                      {contract.status === "pending" && (
                        <div className="flex gap-3 mt-3">
                          <Button
                            variant="outline"
                            onClick={() => handleRenew(contract.id)}
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
    </div>
  );
};

export default ContractAlerts;