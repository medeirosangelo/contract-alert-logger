import { Button } from "@/components/ui/button";
import ContractIdentification from "./contract/ContractIdentification";
import ContractorInfo from "./contract/ContractorInfo";
import ContractDetails from "./contract/ContractDetails";
import PaymentInfo from "./contract/PaymentInfo";
import PenaltiesInfo from "./contract/PenaltiesInfo";
import BudgetClassification from "./contract/BudgetClassification";
import AdditionalInfo from "./contract/AdditionalInfo";
import { useContractForm } from "@/hooks/useContractForm";

const ContractForm = () => {
  const { formData, handleInputChange, handleSubmit, handleGenerateContract } = useContractForm();

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
        <Button onClick={handleGenerateContract} type="button" variant="outline" className="bg-green-500 text-white hover:bg-green-600">
          Gerar Contrato
        </Button>
        <Button type="submit">Salvar Contrato</Button>
      </div>
    </form>
  );
};

export default ContractForm;