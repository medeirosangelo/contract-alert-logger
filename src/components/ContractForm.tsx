import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ContractIdentification from "./contract/ContractIdentification";
import ContractorInfo from "./contract/ContractorInfo";
import ContractDetails from "./contract/ContractDetails";
import PaymentInfo from "./contract/PaymentInfo";
import PenaltiesInfo from "./contract/PenaltiesInfo";
import BudgetClassification from "./contract/BudgetClassification";
import AdditionalInfo from "./contract/AdditionalInfo";

interface ContractFormData {
  contractNumber: string;
  object: string;
  contractorCompanyName: string;
  contractorAddress: string;
  contractorCnpj: string;
  contractedCompanyName: string;
  contractedAddress: string;
  contractedCnpj: string;
  legalRepName: string;
  legalRepCpf: string;
  email: string;
  totalValue: string;
  duration: string;
  signatureDate: string;
  publicationDate: string;
  priceAdjustmentTerm: string;
  adjustmentIndex: string;
  bank: string;
  agency: string;
  account: string;
  paymentTerm: string;
  delayPenalty: string;
  terminationPenalty: string;
  budgetUnit: string;
  workProgram: string;
  expenseNature: string;
  resourceSource: string;
  witness1Name: string;
  witness1Cpf: string;
  witness2Name: string;
  witness2Cpf: string;
  signatureLocation: string;
  generalObservations: string;
}

const ContractForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContractFormData>({
    contractNumber: "",
    object: "",
    contractorCompanyName: "",
    contractorAddress: "",
    contractorCnpj: "",
    contractedCompanyName: "",
    contractedAddress: "",
    contractedCnpj: "",
    legalRepName: "",
    legalRepCpf: "",
    email: "",
    totalValue: "",
    duration: "",
    signatureDate: "",
    publicationDate: "",
    priceAdjustmentTerm: "",
    adjustmentIndex: "",
    bank: "",
    agency: "",
    account: "",
    paymentTerm: "",
    delayPenalty: "",
    terminationPenalty: "",
    budgetUnit: "",
    workProgram: "",
    expenseNature: "",
    resourceSource: "",
    witness1Name: "",
    witness1Cpf: "",
    witness2Name: "",
    witness2Cpf: "",
    signatureLocation: "",
    generalObservations: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Contrato salvo com sucesso!",
      description: "O contrato foi cadastrado no sistema.",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      <ContractIdentification
        contractNumber={formData.contractNumber}
        object={formData.object}
        onChange={handleInputChange}
      />

      <ContractorInfo
        type="contractor"
        companyName={formData.contractorCompanyName}
        address={formData.contractorAddress}
        cnpj={formData.contractorCnpj}
        legalRepName=""
        legalRepCpf=""
        email=""
        onChange={handleInputChange}
      />

      <ContractorInfo
        type="contracted"
        companyName={formData.contractedCompanyName}
        address={formData.contractedAddress}
        cnpj={formData.contractedCnpj}
        legalRepName={formData.legalRepName}
        legalRepCpf={formData.legalRepCpf}
        email={formData.email}
        onChange={handleInputChange}
      />

      <ContractDetails
        totalValue={formData.totalValue}
        duration={formData.duration}
        signatureDate={formData.signatureDate}
        publicationDate={formData.publicationDate}
        priceAdjustmentTerm={formData.priceAdjustmentTerm}
        adjustmentIndex={formData.adjustmentIndex}
        onChange={handleInputChange}
      />

      <PaymentInfo
        bank={formData.bank}
        agency={formData.agency}
        account={formData.account}
        paymentTerm={formData.paymentTerm}
        onChange={handleInputChange}
      />

      <PenaltiesInfo
        delayPenalty={formData.delayPenalty}
        terminationPenalty={formData.terminationPenalty}
        onChange={handleInputChange}
      />

      <BudgetClassification
        budgetUnit={formData.budgetUnit}
        workProgram={formData.workProgram}
        expenseNature={formData.expenseNature}
        resourceSource={formData.resourceSource}
        onChange={handleInputChange}
      />

      <AdditionalInfo
        witness1Name={formData.witness1Name}
        witness1Cpf={formData.witness1Cpf}
        witness2Name={formData.witness2Name}
        witness2Cpf={formData.witness2Cpf}
        signatureLocation={formData.signatureLocation}
        generalObservations={formData.generalObservations}
        onChange={handleInputChange}
      />

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button type="submit">Salvar Contrato</Button>
      </div>
    </form>
  );
};

export default ContractForm;