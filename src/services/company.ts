export interface CompanyData {
  companyName: string;
  tradeName: string;
  address: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  legalRepName: string;
  legalRepCpf: string;
}

const empty: CompanyData = {
  companyName: "",
  tradeName: "",
  address: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
  zipCode: "",
  phone: "",
  email: "",
  legalRepName: "",
  legalRepCpf: "",
};

/**
 * Consulta dados públicos de empresa por CNPJ na BrasilAPI.
 * Retorna campos vazios quando o CNPJ não é encontrado.
 */
export const fetchCompanyByCNPJ = async (cnpj: string): Promise<CompanyData> => {
  const digits = (cnpj || "").replace(/\D/g, "");
  if (digits.length !== 14) return empty;

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${digits}`);
    if (!response.ok) return empty;

    const data = await response.json();
    const socio = Array.isArray(data.qsa) && data.qsa.length > 0 ? data.qsa[0] : null;

    return {
      companyName: data.razao_social || "",
      tradeName: data.nome_fantasia || "",
      address: [data.descricao_tipo_de_logradouro, data.logradouro, data.numero, data.bairro, data.municipio, data.uf]
        .filter(Boolean)
        .join(", "),
      street: [data.descricao_tipo_de_logradouro, data.logradouro].filter(Boolean).join(" "),
      number: data.numero || "",
      complement: data.complemento || "",
      neighborhood: data.bairro || "",
      city: data.municipio || "",
      state: data.uf || "",
      zipCode: data.cep ? String(data.cep).replace(/\D/g, "") : "",
      phone: data.ddd_telefone_1 || "",
      email: data.email || "",
      legalRepName: socio?.nome_socio || "",
      legalRepCpf: "",
    };
  } catch (error) {
    console.error("Erro ao consultar CNPJ na BrasilAPI:", error);
    return empty;
  }
};
