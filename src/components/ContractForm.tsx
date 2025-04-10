
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { contractsApi } from "@/services/contracts";
import { ContractInsert } from "@/services/types";
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
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Schema de validação do contrato
const contractSchema = z.object({
  // Identification
  contractNumber: z.string().min(1, "Número do contrato é obrigatório"),
  object: z.string().min(5, "Descrição do objeto é obrigatória"),
  
  // Contractor
  contractorCompanyName: z.string().min(3, "Nome da empresa contratante é obrigatório"),
  contractorAddress: z.string().min(5, "Endereço do contratante é obrigatório"),
  contractorCnpj: z.string().min(14, "CNPJ inválido"),
  
  // Contracted
  contractedCompanyName: z.string().min(3, "Nome da empresa contratada é obrigatório"),
  contractedAddress: z.string().min(5, "Endereço do contratado é obrigatório"),
  contractedCnpj: z.string().min(14, "CNPJ inválido"),
  legalRepName: z.string().min(3, "Nome do representante legal é obrigatório"),
  legalRepCpf: z.string().min(11, "CPF inválido"),
  email: z.string().email("Email inválido"),
  
  // Contract Details
  totalValue: z.string().min(1, "Valor total é obrigatório"),
  duration: z.string().min(1, "Duração é obrigatória"),
  signatureDate: z.string().min(1, "Data de assinatura é obrigatória"),
  publicationDate: z.string().optional(),
  priceAdjustmentTerm: z.string().optional(),
  adjustmentIndex: z.string().optional(),
  
  // Payment Info
  bank: z.string().optional(),
  agency: z.string().optional(),
  account: z.string().optional(),
  paymentTerm: z.string().optional(),
  
  // Budget Classification
  budgetUnit: z.string().optional(),
  workProgram: z.string().optional(),
  expenseNature: z.string().optional(),
  resourceSource: z.string().optional(),
  
  // Penalties
  delayPenalty: z.string().optional(),
  terminationPenalty: z.string().optional(),
  
  // Additional Info
  witness1Name: z.string().optional(),
  witness1Cpf: z.string().optional(),
  witness2Name: z.string().optional(),
  witness2Cpf: z.string().optional(),
  signatureLocation: z.string().optional(),
  generalObservations: z.string().optional()
});

type FormData = z.infer<typeof contractSchema>;

const ContractForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Configurar o formulário com react-hook-form e zod
  const form = useForm<FormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
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
      budgetUnit: "",
      workProgram: "",
      expenseNature: "",
      resourceSource: "",
      delayPenalty: "",
      terminationPenalty: "",
      witness1Name: "",
      witness1Cpf: "",
      witness2Name: "",
      witness2Cpf: "",
      signatureLocation: "",
      generalObservations: ""
    }
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
  
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Format contract data to match database structure
      const contractData: ContractInsert = {
        contract_number: data.contractNumber,
        object: data.object,
        total_value: Number(data.totalValue),
        duration: Number(data.duration),
        signature_date: data.signatureDate,
        publication_date: data.publicationDate || null,
        price_adjustment_term: data.priceAdjustmentTerm ? Number(data.priceAdjustmentTerm) : null,
        adjustment_index: data.adjustmentIndex || null,
        bank: data.bank || null,
        agency: data.agency || null,
        account: data.account || null,
        payment_term: data.paymentTerm || null,
        budget_unit: data.budgetUnit || null,
        work_program: data.workProgram || null,
        expense_nature: data.expenseNature || null,
        resource_source: data.resourceSource || null,
        delay_penalty: data.delayPenalty || null,
        termination_penalty: data.terminationPenalty || null,
        signature_location: data.signatureLocation || null,
        general_observations: data.generalObservations || null,
        
        // Calculate start and end dates based on signature date and duration
        start_date: data.signatureDate,
        end_date: calculateEndDate(data.signatureDate, Number(data.duration)),
        
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-warm-200">
          <h2 className="text-2xl font-bold text-warm-800 mb-6">Cadastro de Contrato</h2>
          
          <div className="space-y-6">
            {/* Contract Identification */}
            <FormField
              control={form.control}
              name="contractNumber"
              render={({ field }) => (
                <ContractIdentification 
                  contractNumber={field.value}
                  formControl={form.control}
                  errors={form.formState.errors}
                  object={form.getValues("object")}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    form.setValue(name as any, value, { shouldValidate: true });
                  }}
                />
              )}
            />
            
            {/* Contractor Information */}
            <ContractorInfo 
              companyName={form.getValues("contractorCompanyName")}
              address={form.getValues("contractorAddress")}
              cnpj={form.getValues("contractorCnpj")}
              legalRepName=""
              legalRepCpf=""
              email=""
              formControl={form.control}
              errors={form.formState.errors}
              onChange={(e) => {
                const { name, value } = e.target;
                form.setValue(name as any, value, { shouldValidate: true });
              }}
              type="contractor"
            />
            
            {/* Contracted Information */}
            <ContractorInfo 
              companyName={form.getValues("contractedCompanyName")}
              address={form.getValues("contractedAddress")}
              cnpj={form.getValues("contractedCnpj")}
              legalRepName={form.getValues("legalRepName")}
              legalRepCpf={form.getValues("legalRepCpf")}
              email={form.getValues("email")}
              formControl={form.control}
              errors={form.formState.errors}
              onChange={(e) => {
                const { name, value } = e.target;
                form.setValue(name as any, value, { shouldValidate: true });
              }}
              type="contracted"
            />
            
            {/* Contract Details */}
            <ContractDetails 
              totalValue={form.getValues("totalValue")}
              duration={form.getValues("duration")}
              signatureDate={form.getValues("signatureDate")}
              publicationDate={form.getValues("publicationDate")}
              priceAdjustmentTerm={form.getValues("priceAdjustmentTerm")}
              adjustmentIndex={form.getValues("adjustmentIndex")}
              formControl={form.control}
              errors={form.formState.errors}
              onChange={(e) => {
                const { name, value } = e.target;
                form.setValue(name as any, value, { shouldValidate: true });
              }}
            />
            
            {/* Payment Information */}
            <PaymentInfo 
              bank={form.getValues("bank")}
              agency={form.getValues("agency")}
              account={form.getValues("account")}
              paymentTerm={form.getValues("paymentTerm")}
              formControl={form.control}
              errors={form.formState.errors}
              onChange={(e) => {
                const { name, value } = e.target;
                form.setValue(name as any, value, { shouldValidate: true });
              }}
            />
            
            {/* Budget Classification */}
            <BudgetClassification 
              budgetUnit={form.getValues("budgetUnit")}
              workProgram={form.getValues("workProgram")}
              expenseNature={form.getValues("expenseNature")}
              resourceSource={form.getValues("resourceSource")}
              formControl={form.control}
              errors={form.formState.errors}
              onChange={(e) => {
                const { name, value } = e.target;
                form.setValue(name as any, value, { shouldValidate: true });
              }}
            />
            
            {/* Penalties Information */}
            <PenaltiesInfo 
              delayPenalty={form.getValues("delayPenalty")}
              terminationPenalty={form.getValues("terminationPenalty")}
              formControl={form.control}
              errors={form.formState.errors}
              onChange={(e) => {
                const { name, value } = e.target;
                form.setValue(name as any, value, { shouldValidate: true });
              }}
            />
            
            {/* Additional Information */}
            <AdditionalInfo 
              witness1Name={form.getValues("witness1Name")}
              witness1Cpf={form.getValues("witness1Cpf")}
              witness2Name={form.getValues("witness2Name")}
              witness2Cpf={form.getValues("witness2Cpf")}
              signatureLocation={form.getValues("signatureLocation")}
              generalObservations={form.getValues("generalObservations")}
              formControl={form.control}
              errors={form.formState.errors}
              onChange={(e) => {
                const { name, value } = e.target;
                form.setValue(name as any, value, { shouldValidate: true });
              }}
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
    </Form>
  );
};

export default ContractForm;
