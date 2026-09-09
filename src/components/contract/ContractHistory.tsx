import { useQuery } from "@tanstack/react-query";
import { contractHistoryApi, fieldLabel, ContractHistoryEntry } from "@/services/contractHistory";
import { Skeleton } from "@/components/ui/skeleton";
import { History } from "lucide-react";

interface ContractHistoryProps {
  contractId: string;
}

const ContractHistory = ({ contractId }: ContractHistoryProps) => {
  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["contract-history", contractId],
    queryFn: () => contractHistoryApi.getHistory(contractId),
  });

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <History className="h-8 w-8 mx-auto mb-2 opacity-60" />
        <p>Nenhuma alteração registrada para este contrato.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry: ContractHistoryEntry) => (
        <div key={entry.id} className="border rounded-lg p-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="font-medium">{fieldLabel(entry.field_name)}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(entry.created_at).toLocaleString("pt-BR")}
            </p>
          </div>
          <p className="text-sm text-muted-foreground break-words">
            <span className="line-through">{entry.old_value || "vazio"}</span>
            {" → "}
            <span className="text-foreground font-medium">{entry.new_value || "vazio"}</span>
          </p>
          {entry.changed_by_name && (
            <p className="text-xs text-muted-foreground mt-1">por {entry.changed_by_name}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContractHistory;
