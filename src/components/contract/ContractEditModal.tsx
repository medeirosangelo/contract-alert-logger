import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save } from "lucide-react";

interface ContractEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: any;
  onSave: () => void;
}

const ContractEditModal = ({ isOpen, onClose, contract, onSave }: ContractEditModalProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    contract_number: contract?.contract_number || "",
    object: contract?.object || "",
    total_value: contract?.total_value || 0,
    start_date: contract?.start_date || "",
    end_date: contract?.end_date || "",
    duration: contract?.duration || 0,
    status: contract?.status || "active",
    general_observations: contract?.general_observations || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!contract?.id) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('contracts')
        .update({
          contract_number: formData.contract_number,
          object: formData.object,
          total_value: Number(formData.total_value),
          start_date: formData.start_date,
          end_date: formData.end_date,
          duration: Number(formData.duration),
          status: formData.status,
          general_observations: formData.general_observations,
          updated_at: new Date().toISOString(),
        })
        .eq('id', contract.id);

      if (error) throw error;

      toast({
        title: "Contrato atualizado",
        description: "As alterações foram salvas com sucesso.",
      });
      
      onSave();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar contrato:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o contrato.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.split('T')[0];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Editar Contrato</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contract_number">Nº do Contrato</Label>
              <Input
                id="contract_number"
                name="contract_number"
                value={formData.contract_number}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="active">Ativo</option>
                <option value="finished">Finalizado</option>
                <option value="cancelled">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="object">Objeto do Contrato</Label>
            <Textarea
              id="object"
              name="object"
              value={formData.object}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_value">Valor Total (R$)</Label>
              <Input
                id="total_value"
                name="total_value"
                type="number"
                value={formData.total_value}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duração (meses)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Data de Início</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                value={formatDate(formData.start_date)}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">Data de Vencimento</Label>
              <Input
                id="end_date"
                name="end_date"
                type="date"
                value={formatDate(formData.end_date)}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="general_observations">Observações</Label>
            <Textarea
              id="general_observations"
              name="general_observations"
              value={formData.general_observations || ""}
              onChange={handleChange}
              rows={3}
              placeholder="Observações gerais sobre o contrato..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContractEditModal;
