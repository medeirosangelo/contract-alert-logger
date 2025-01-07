interface ContractData {
  contractNumber: string;
  object: string;
  contractorName: string;
  contractorAddress: string;
  contractorCnpj: string;
  contractedName: string;
  contractedAddress: string;
  contractedCnpj: string;
  legalRepName: string;
  legalRepCpf: string;
  totalValue: string;
  duration: string;
  signatureDate: string;
  witness1Name: string;
  witness1Cpf: string;
  witness2Name: string;
  witness2Cpf: string;
  signatureLocation: string;
}

export const generateContractPDF = async (data: ContractData) => {
  // Generate contract template
  const template = `
CONTRATO Nº ${data.contractNumber}/2024
CONTRATO DE AQUISIÇÃO QUE ENTRE SI CELEBRAM O FUNDO ESPECIAL DA DEFENSORIA PÚBLICA DO ESTADO DE RORAIMA E ${data.contractedName}

CLÁUSULA PRIMEIRA - OBJETO
1.1. O presente contrato tem por objeto ${data.object}.

CLÁUSULA SEGUNDA - VIGÊNCIA
2.1. O prazo de vigência será de ${data.duration} meses, contados a partir da assinatura deste contrato.
2.2. A vigência poderá ser prorrogada mediante aditivo contratual, conforme legislação aplicável.

CLÁUSULA TERCEIRA - PREÇO E CONDIÇÕES DE PAGAMENTO
3.1. O valor total do contrato é de R$ ${data.totalValue}, incluídos todos os encargos diretos e indiretos.
3.2. O pagamento será realizado mediante apresentação de Nota Fiscal e comprovante de entrega do objeto.

CLÁUSULA QUARTA - OBRIGAÇÕES DAS PARTES

4.1. Obrigações do Contratante:
- Fiscalizar a execução do contrato.
- Efetuar os pagamentos nos prazos estabelecidos.

4.2. Obrigações da Contratada:
- Executar o objeto conforme especificações técnicas.
- Garantir os produtos/serviços pelo prazo estabelecido.
- Substituir quaisquer itens com defeito no prazo acordado.

CLÁUSULA QUINTA - SANÇÕES E PENALIDADES
5.1. Em caso de descumprimento das obrigações contratuais, a Contratada estará sujeita às penalidades previstas na Lei nº 14.133/2021.

CLÁUSULA SEXTA - RESCISÃO CONTRATUAL
6.1. O contrato poderá ser rescindido por comum acordo entre as partes ou por inadimplência.

CLÁUSULA SÉTIMA - DISPOSIÇÕES GERAIS
7.1. Os casos omissos serão resolvidos conforme a legislação vigente, em especial a Lei nº 14.133/2021.
7.2. O foro competente para dirimir conflitos será o da Comarca de Boa Vista/RR.

Local e data: ${data.signatureLocation}, ${new Date(data.signatureDate).toLocaleDateString()}

CONTRATANTE:
Nome: __________________________
Cargo: __________________________
CNPJ: ${data.contractorCnpj}

CONTRATADA:
Nome: ${data.legalRepName}
CPF: ${data.legalRepCpf}
Cargo: Representante Legal
CNPJ: ${data.contractedCnpj}

TESTEMUNHAS:
1. Nome: ${data.witness1Name}
   CPF: ${data.witness1Cpf}

2. Nome: ${data.witness2Name}
   CPF: ${data.witness2Cpf}
`;

  // Create and download PDF
  const blob = new Blob([template], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `contrato-${data.contractNumber}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};