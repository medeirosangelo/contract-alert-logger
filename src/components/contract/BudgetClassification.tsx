
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";

interface BudgetClassificationProps {
  budgetUnit: string;
  workProgram: string;
  expenseNature: string;
  resourceSource: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formControl: Control<any>;
  errors: any;
}

const BudgetClassification = ({ 
  budgetUnit, 
  workProgram, 
  expenseNature, 
  resourceSource, 
  onChange,
  formControl,
  errors
}: BudgetClassificationProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Classificação Orçamentária</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="budgetUnit">
              Unidade Orçamentária
            </Label>
            <FormControl>
              <Input
                id="budgetUnit"
                name="budgetUnit"
                value={budgetUnit}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="workProgram">
              Programa de Trabalho
            </Label>
            <FormControl>
              <Input
                id="workProgram"
                name="workProgram"
                value={workProgram}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="expenseNature">
              Natureza da Despesa
            </Label>
            <FormControl>
              <Input
                id="expenseNature"
                name="expenseNature"
                value={expenseNature}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
        
        <div className="space-y-2">
          <FormItem className="space-y-1">
            <Label htmlFor="resourceSource">
              Fonte de Recurso
            </Label>
            <FormControl>
              <Input
                id="resourceSource"
                name="resourceSource"
                value={resourceSource}
                onChange={onChange}
              />
            </FormControl>
          </FormItem>
        </div>
      </div>
    </div>
  );
};

export default BudgetClassification;
