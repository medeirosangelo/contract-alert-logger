import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PenaltiesInfoProps {
  delayPenalty: string;
  terminationPenalty: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PenaltiesInfo = ({ delayPenalty, terminationPenalty, onChange }: PenaltiesInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Penalidades</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="delayPenalty">Multa por Atraso (%)</Label>
          <Input
            id="delayPenalty"
            name="delayPenalty"
            type="number"
            step="0.01"
            value={delayPenalty}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="terminationPenalty">Multa por Rescisão (%)</Label>
          <Input
            id="terminationPenalty"
            name="terminationPenalty"
            type="number"
            step="0.01"
            value={terminationPenalty}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PenaltiesInfo;