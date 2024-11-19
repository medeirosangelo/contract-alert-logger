import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BudgetClassificationProps {
  budgetUnit: string;
  workProgram: string;
  expenseNature: string;
  resourceSource: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BudgetClassification = ({ budgetUnit, workProgram, expenseNature, resourceSource, onChange }: BudgetClassificationProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 text-warm-800">Classificação Orçamentária</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="budgetUnit">Unidade Orçamentária</Label>
          <Input
            id="budgetUnit"
            name="budgetUnit"
            value={budgetUnit}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="workProgram">Programa de Trabalho</Label>
          <Input
            id="workProgram"
            name="workProgram"
            value={workProgram}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expenseNature">Natureza da Despesa</Label>
          <Input
            id="expenseNature"
            name="expenseNature"
            value={expenseNature}
            onChange={onChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="resourceSource">Fonte de Recursos</Label>
          <Input
            id="resourceSource"
            name="resourceSource"
            value={resourceSource}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetClassification;