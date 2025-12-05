import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Download, Pencil, Calendar, DollarSign, Clock, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Contract {
  id?: string;
  contract_number?: string;
  object?: string;
  total_value?: number;
  duration?: number;
  signature_date?: string;
  publication_date?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  bank?: string;
  agency?: string;
  account?: string;
  payment_term?: string;
  delay_penalty?: string;
  termination_penalty?: string;
  budget_unit?: string;
  work_program?: string;
  expense_nature?: string;
  resource_source?: string;
  signature_location?: string;
  general_observations?: string;
  contractor?: {
    company_name?: string;
    cnpj?: string;
  };
  contracted?: {
    company_name?: string;
    cnpj?: string;
  };
}

interface ContractViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Contract | null;
}

const ContractViewModal = ({ isOpen, onClose, contract }: ContractViewModalProps) => {
  if (!contract) return null;

  const formatCurrency = (value: number | undefined) => {
    if (!value) return "R$ 0,00";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getDaysLeft = (dateString: string | undefined) => {
    if (!dateString) return 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endDate = new Date(dateString);
    endDate.setHours(0, 0, 0, 0);
    const diffTime = endDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysLeft(contract.end_date);
  const statusColor = daysLeft <= 30 ? 'destructive' : daysLeft <= 60 ? 'secondary' : 'default';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            Contrato {contract.contract_number}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            <TabsTrigger value="financial">Financeiro</TabsTrigger>
            <TabsTrigger value="dates">Datas e Prazos</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            {/* Cabeçalho do Contrato */}
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {contract.object || "Objeto não informado"}
                  </h3>
                  <Badge variant={statusColor as any}>
                    {contract.status === 'active' ? 'Ativo' : contract.status === 'expired' ? 'Vencido' : contract.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{formatCurrency(contract.total_value)}</p>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                </div>
              </div>
            </div>

            {/* Informações Gerais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Building className="w-4 h-4" /> Contratante
                </h4>
                <div className="bg-background border rounded-lg p-3">
                  <p className="font-medium">{contract.contractor?.company_name || "Prefeitura Municipal"}</p>
                  <p className="text-sm text-muted-foreground">{contract.contractor?.cnpj || "CNPJ não informado"}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Building className="w-4 h-4" /> Contratado
                </h4>
                <div className="bg-background border rounded-lg p-3">
                  <p className="font-medium">{contract.contracted?.company_name || "Não informado"}</p>
                  <p className="text-sm text-muted-foreground">{contract.contracted?.cnpj || "CNPJ não informado"}</p>
                </div>
              </div>
            </div>

            {/* Detalhes Adicionais */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duração</label>
                <p className="text-foreground font-medium">{contract.duration ? `${contract.duration} meses` : "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Local de Assinatura</label>
                <p className="text-foreground font-medium">{contract.signature_location || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="text-foreground font-medium capitalize">{contract.status || "-"}</p>
              </div>
            </div>

            {contract.general_observations && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Observações Gerais</label>
                <p className="text-foreground bg-muted/30 rounded p-3 mt-1">{contract.general_observations}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Informações Financeiras</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Valor Total</label>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(contract.total_value)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Prazo de Pagamento</label>
                  <p className="text-foreground font-medium">{contract.payment_term || "Não informado"}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Banco</label>
                <p className="text-foreground font-medium">{contract.bank || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Agência</label>
                <p className="text-foreground font-medium">{contract.agency || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Conta</label>
                <p className="text-foreground font-medium">{contract.account || "-"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Unidade Orçamentária</label>
                <p className="text-foreground font-medium">{contract.budget_unit || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Programa de Trabalho</label>
                <p className="text-foreground font-medium">{contract.work_program || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Natureza da Despesa</label>
                <p className="text-foreground font-medium">{contract.expense_nature || "-"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Fonte de Recurso</label>
                <p className="text-foreground font-medium">{contract.resource_source || "-"}</p>
              </div>
            </div>

            {(contract.delay_penalty || contract.termination_penalty) && (
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Penalidades</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contract.delay_penalty && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Multa por Atraso</label>
                      <p className="text-foreground">{contract.delay_penalty}</p>
                    </div>
                  )}
                  {contract.termination_penalty && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Multa Rescisória</label>
                      <p className="text-foreground">{contract.termination_penalty}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="dates" className="space-y-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">Datas e Prazos</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-background rounded-lg border">
                  <p className="text-sm text-muted-foreground">Assinatura</p>
                  <p className="font-bold text-foreground">{formatDate(contract.signature_date)}</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg border">
                  <p className="text-sm text-muted-foreground">Início</p>
                  <p className="font-bold text-foreground">{formatDate(contract.start_date)}</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg border">
                  <p className="text-sm text-muted-foreground">Término</p>
                  <p className="font-bold text-foreground">{formatDate(contract.end_date)}</p>
                </div>
                <div className="text-center p-3 bg-background rounded-lg border">
                  <p className="text-sm text-muted-foreground">Publicação</p>
                  <p className="font-bold text-foreground">{formatDate(contract.publication_date)}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className={`text-center p-6 rounded-lg border-2 ${
                daysLeft <= 30 ? 'border-destructive bg-destructive/10' :
                daysLeft <= 60 ? 'border-orange-500 bg-orange-50' :
                'border-green-500 bg-green-50'
              }`}>
                <Clock className={`w-10 h-10 mx-auto mb-2 ${
                  daysLeft <= 30 ? 'text-destructive' :
                  daysLeft <= 60 ? 'text-orange-500' :
                  'text-green-500'
                }`} />
                <p className="text-sm text-muted-foreground">Dias Restantes</p>
                <p className={`text-4xl font-bold ${
                  daysLeft <= 30 ? 'text-destructive' :
                  daysLeft <= 60 ? 'text-orange-600' :
                  'text-green-600'
                }`}>{daysLeft}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Duração do Contrato</label>
                <p className="text-foreground font-medium">{contract.duration ? `${contract.duration} meses` : "-"}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractViewModal;
