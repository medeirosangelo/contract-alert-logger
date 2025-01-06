import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { fetchCompanyByCNPJ } from "@/services/company";
import { generateContractPDF } from "@/utils/contractUtils";

export interface ContractFormData {
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

const initialFormData: ContractFormData = {
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
};

export const useContractForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContractFormData>(initialFormData);

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "contractorCnpj" || name === "contractedCnpj") {
      console.log(`Fetching data for ${name}:`, value);
      try {
        const companyData = await fetchCompanyByCNPJ(value);
        console.log('Received company data:', companyData);
        
        if (companyData.companyName) {
          setFormData(prev => ({
            ...prev,
            [`${name === "contractorCnpj" ? "contractor" : "contracted"}CompanyName`]: companyData.companyName,
            [`${name === "contractorCnpj" ? "contractor" : "contracted"}Address`]: companyData.address,
            ...(name === "contractedCnpj" && {
              legalRepName: companyData.legalRepName,
              legalRepCpf: companyData.legalRepCpf,
              email: companyData.email,
            }),
          }));

          toast({
            title: "Dados preenchidos automaticamente",
            description: "Os dados da empresa foram carregados com sucesso.",
          });
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados da empresa.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Contrato salvo com sucesso!",
      description: "O contrato foi cadastrado no sistema.",
    });
  };

  const handleGenerateContract = async () => {
    try {
      const contractNumber = formData.contractNumber || `${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`;
      const contractData = {
        contractNumber,
        object: formData.object,
        contractorName: formData.contractorCompanyName,
        contractorAddress: formData.contractorAddress,
        contractorCnpj: formData.contractorCnpj,
        contractedName: formData.contractedCompanyName,
        contractedAddress: formData.contractedAddress,
        contractedCnpj: formData.contractedCnpj,
        legalRepName: formData.legalRepName,
        legalRepCpf: formData.legalRepCpf,
        totalValue: formData.totalValue,
        duration: formData.duration,
        signatureDate: formData.signatureDate,
        witness1Name: formData.witness1Name,
        witness1Cpf: formData.witness1Cpf,
        witness2Name: formData.witness2Name,
        witness2Cpf: formData.witness2Cpf,
        signatureLocation: formData.signatureLocation,
      };

      await generateContractPDF(contractData);
      toast({
        title: "Contrato gerado com sucesso!",
        description: "O arquivo PDF foi baixado automaticamente.",
      });
    } catch (error) {
      console.error("Error generating contract:", error);
      toast({
        title: "Erro ao gerar contrato",
        description: "Não foi possível gerar o arquivo PDF.",
        variant: "destructive",
      });
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    handleGenerateContract,
  };
};