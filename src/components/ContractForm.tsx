
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { contractsApi, ContractInsert } from "@/services/contracts";
import { legalPersonsApi } from "@/services/legalPersons";
import { physicalPersonsApi } from "@/services/physicalPersons";
import { useQuery } from "@tanstack/react-query";
import ContractIdentification from "./contract/ContractIdentification";
import ContractorInfo from "./contract/ContractorInfo";
import ContractDetails from "./contract/ContractDetails";
import PaymentInfo from "./contract/PaymentInfo";
import BudgetClassification from "./contract/BudgetClassification";
import PenaltiesInfo from "./contract/PenaltiesInfo";
import AdditionalInfo from "./contract/AdditionalInfo";

const ContractForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Identification
    contractNumber: "",
    object: "",
    
    // Contractor
    contractorCompanyName: "",
    contractorAddress: "",
    contractorCnpj: "",
    
    // Contracted
    contractedCompanyName: "",
    contractedAddress: "",
    contractedCnpj: "",
    legalRepName: "",
    legalRepCpf: "",
    email: "",
    
    // Contract Details
    totalValue: "",
    duration: "",
    signatureDate: "",
    publicationDate: "",
    priceAdjustmentTerm: "",
    adjustmentIndex: "",
    
    // Payment Info
    bank: "",
    agency: "",
    account: "",
    paymentTerm: "",
    
    // Budget Classification
    budgetUnit: "",
    workProgram: "",
    expenseNature: "",
    resourceSource: "",
    
    // Penalties
    delayPenalty: "",
    terminationPenalty: "",
    
    // Additional Info
    witness1Name: "",
    witness1Cpf: "",
    witness2Name: "",
    witness2Cpf: "",
    signatureLocation: "",
    generalObservations: ""
  });
  
  // Fetch legal persons for dropdown selection
  const { data: legalPersons, isLoading: isLoadingLegalPersons } = useQuery({
    queryKey: ["legalPersons"],
    queryFn: legalPersonsApi.getAll,
  });
  
  // Fetch physical persons for witnesses
  const { data: physicalPersons, isLoading: isLoadingPhysicalPersons } = useQuery({
    queryKey: ["physicalPersons"],
    queryFn: physicalPersonsApi.getAll,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Format contract data to match database structure
      const contractData: ContractInsert = {
        contract_number: formData.contractNumber,
        object: formData.object,
        total_value: Number(formData.totalValue),
        duration: Number(formData.duration),
        signature_date: formData.signatureDate,
        publication_date: formData.publicationDate || null,
        price_adjustment_term: formData.priceAdjustmentTerm ? Number(formData.priceAdjustmentTerm) : null,
        adjustment_index: formData.adjustmentIndex || null,
        bank: formData.bank || null,
        agency: formData.agency || null,
        account: formData.account || null,
        payment_term: formData.paymentTerm || null,
        budget_unit: formData.budgetUnit || null,
        work_program: formData.workProgram || null,
        expense_nature: formData.expenseNature || null,
        resource_source: formData.resourceSource || null,
        delay_penalty: formData.delayPenalty || null,
        termination_penalty: formData.terminationPenalty || null,
        signature_location: formData.signatureLocation || null,
        general_observations: formData.generalObservations || null,
        
        // Calculate start and end dates based on signature date and duration
        start_date: formData.signatureDate,
        end_date: calculateEndDate(formData.signatureDate, Number(formData.duration)),
        
        // These would come from API lookups in a real implementation
        contractor_id: null, // To be replaced with actual lookup
        contracted_id: null, // To be replaced with actual lookup
        legal_rep_id: null,  // To be replaced with actual lookup
        witness1_id: null,   // To be replaced with actual lookup
        witness2_id: null,   // To be replaced with actual lookup
        
        // Default status to active
        status: 'active'
      };
      
      console.log("Submitting contract data:", contractData);
      await contractsApi.create(contractData);
      
      toast({
        title: "Contrato cadastrado com sucesso!",
        description: "Os dados do contrato foram salvos.",
      });
      
      // Navigate to contract list
      navigate("/contracts");
    } catch (error) {
      console.error("Error creating contract:", error);
      toast({
        title: "Erro ao cadastrar contrato",
        description: "Ocorreu um erro ao salvar os dados do contrato.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to calculate end date
  const calculateEndDate = (startDateStr: string, durationMonths: number): string => {
    if (!startDateStr || isNaN(durationMonths)) return '';
    
    const startDate = new Date(startDateStr);
    startDate.setMonth(startDate.getMonth() + durationMonths);
    
    return startDate.toISOString().split('T')[0];
  };
  
  if (isLoadingLegalPersons || isLoadingPhysicalPersons) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Carregando dados...</span>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6 border border-warm-200">
        <h2 className="text-2xl font-bold text-warm-800 mb-6">Cadastro de Contrato</h2>
        
        <div className="space-y-6">
          {/* Contract Identification */}
          <ContractIdentification 
            contractNumber={formData.contractNumber} 
            object={formData.object} 
            onChange={handleInputChange} 
          />
          
          {/* Contractor Information */}
          <ContractorInfo 
            companyName={formData.contractorCompanyName}
            address={formData.contractorAddress}
            cnpj={formData.contractorCnpj}
            legalRepName=""
            legalRepCpf=""
            email=""
            onChange={handleInputChange}
            type="contractor"
          />
          
          {/* Contracted Information */}
          <ContractorInfo 
            companyName={formData.contractedCompanyName}
            address={formData.contractedAddress}
            cnpj={formData.contractedCnpj}
            legalRepName={formData.legalRepName}
            legalRepCpf={formData.legalRepCpf}
            email={formData.email}
            onChange={handleInputChange}
            type="contracted"
          />
          
          {/* Contract Details */}
          <ContractDetails 
            totalValue={formData.totalValue}
            duration={formData.duration}
            signatureDate={formData.signatureDate}
            publicationDate={formData.publicationDate}
            priceAdjustmentTerm={formData.priceAdjustmentTerm}
            adjustmentIndex={formData.adjustmentIndex}
            onChange={handleInputChange}
          />
          
          {/* Payment Information */}
          <PaymentInfo 
            bank={formData.bank}
            agency={formData.agency}
            account={formData.account}
            paymentTerm={formData.paymentTerm}
            onChange={handleInputChange}
          />
          
          {/* Budget Classification */}
          <BudgetClassification 
            budgetUnit={formData.budgetUnit}
            workProgram={formData.workProgram}
            expenseNature={formData.expenseNature}
            resourceSource={formData.resourceSource}
            onChange={handleInputChange}
          />
          
          {/* Penalties Information */}
          <PenaltiesInfo 
            delayPenalty={formData.delayPenalty}
            terminationPenalty={formData.terminationPenalty}
            onChange={handleInputChange}
          />
          
          {/* Additional Information */}
          <AdditionalInfo 
            witness1Name={formData.witness1Name}
            witness1Cpf={formData.witness1Cpf}
            witness2Name={formData.witness2Name}
            witness2Cpf={formData.witness2Cpf}
            signatureLocation={formData.signatureLocation}
            generalObservations={formData.generalObservations}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            type="submit" 
            className="bg-primary hover:bg-primary/90 text-white gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Salvar Contrato
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ContractForm;
