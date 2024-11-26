import api from './api';

export interface CompanyData {
  companyName: string;
  address: string;
  legalRepName: string;
  legalRepCpf: string;
  email: string;
}

export const fetchCompanyByCNPJ = async (cnpj: string): Promise<CompanyData> => {
  console.log('Fetching company data for CNPJ:', cnpj);
  
  // Mock API call - replace with actual API endpoint
  // This simulates fetching data from your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      if (cnpj === '12.345.678/0001-90') {
        resolve({
          companyName: "Empresa ABC Ltda",
          address: "Av. Comercial, 1000, Sala 123, Centro, São Paulo - SP",
          legalRepName: "José Silva",
          legalRepCpf: "123.456.789-00",
          email: "contato@empresaabc.com"
        });
      } else {
        resolve({
          companyName: "",
          address: "",
          legalRepName: "",
          legalRepCpf: "",
          email: ""
        });
      }
    }, 500);
  });
};