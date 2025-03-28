
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface PenaltiesInfoProps {
  delayPenalty: string;
  terminationPenalty: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formControl: Control<any>;
  errors: any;
}

const PenaltiesInfo = ({ 
  delayPenalty, 
  terminationPenalty, 
  onChange,
  formControl,
  errors
}: PenaltiesInfoProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Penalidades</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="delayPenalty">
              Multa por Atraso (%)
            </Label>
            <FormControl>
              <Input
                id="delayPenalty"
                name="delayPenalty"
                type="number"
                step="0.01"
                value={delayPenalty}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="terminationPenalty">
              Multa por Rescisão (%)
            </Label>
            <FormControl>
              <Input
                id="terminationPenalty"
                name="terminationPenalty"
                type="number"
                step="0.01"
                value={terminationPenalty}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
      </div>
    </div>
  );
};

export default PenaltiesInfo;
