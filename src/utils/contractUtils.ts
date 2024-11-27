import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Initialize pdfMake with fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  console.log("Generating PDF with data:", data);

  const documentDefinition = {
    content: [
      { text: `CONTRATO Nº ${data.contractNumber}/2024`, style: 'header' },
      { text: '\n' },
      { text: 'CONTRATO DE AQUISIÇÃO QUE ENTRE SI CELEBRAM O FUNDO ESPECIAL DA DEFENSORIA PÚBLICA DO ESTADO DE RORAIMA E ' + data.contractedName.toUpperCase(), style: 'subheader' },
      { text: '\n\n' },
      { text: 'CLÁUSULA PRIMEIRA - OBJETO', style: 'clausula' },
      { text: `1.1. O presente contrato tem por objeto ${data.object}.` },
      { text: '\n\n' },
      { text: 'CLÁUSULA SEGUNDA - VIGÊNCIA', style: 'clausula' },
      { text: `2.1. O prazo de vigência será de ${data.duration} meses, contados a partir da assinatura deste contrato.` },
      { text: '2.2. A vigência poderá ser prorrogada mediante aditivo contratual, conforme legislação aplicável.' },
      { text: '\n\n' },
      { text: 'CLÁUSULA TERCEIRA - PREÇO E CONDIÇÕES DE PAGAMENTO', style: 'clausula' },
      { text: `3.1. O valor total do contrato é de R$ ${data.totalValue}, incluídos todos os encargos diretos e indiretos.` },
      { text: '3.2. O pagamento será realizado mediante apresentação de Nota Fiscal e comprovante de entrega do objeto.' },
      { text: '\n\n' },
      { text: 'ASSINATURAS', style: 'clausula' },
      { text: '\n\n' },
      {
        columns: [
          {
            width: '50%',
            text: [
              'CONTRATANTE:\n',
              '_______________________\n',
              `CNPJ: ${data.contractorCnpj}`
            ]
          },
          {
            width: '50%',
            text: [
              'CONTRATADA:\n',
              '_______________________\n',
              `${data.legalRepName}\n`,
              `CPF: ${data.legalRepCpf}`
            ]
          }
        ]
      },
      { text: '\n\n' },
      {
        columns: [
          {
            width: '50%',
            text: [
              'TESTEMUNHA 1:\n',
              '_______________________\n',
              `${data.witness1Name}\n`,
              `CPF: ${data.witness1Cpf}`
            ]
          },
          {
            width: '50%',
            text: [
              'TESTEMUNHA 2:\n',
              '_______________________\n',
              `${data.witness2Name}\n`,
              `CPF: ${data.witness2Cpf}`
            ]
          }
        ]
      },
      { text: '\n\n' },
      { text: `${data.signatureLocation}, ${new Date(data.signatureDate).toLocaleDateString()}`, alignment: 'right' }
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        alignment: 'center'
      },
      subheader: {
        fontSize: 14,
        bold: true,
        alignment: 'center'
      },
      clausula: {
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 5]
      }
    },
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.2
    }
  };

  try {
    console.log("Creating PDF document...");
    const pdfDoc = pdfMake.createPdf(documentDefinition);
    
    console.log("Downloading PDF...");
    pdfDoc.download(`contrato-${data.contractNumber}.pdf`);
    
    return true;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Falha ao gerar o PDF do contrato");
  }
};