import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

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

const formatCurrency = (value: string) => {
  const number = parseFloat(value);
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(number);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const generateContractPDF = async (data: ContractData) => {
  console.log("Generating PDF with data:", data);

  const documentDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 60, 40, 60],
    content: [
      {
        text: `CONTRATO Nº ${data.contractNumber}`,
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        text: [
          'CONTRATO DE PRESTAÇÃO DE SERVIÇOS QUE ENTRE SI CELEBRAM ',
          { text: data.contractorName.toUpperCase(), bold: true },
          ' E ',
          { text: data.contractedName.toUpperCase(), bold: true }
        ],
        style: 'subheader',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        text: 'QUALIFICAÇÃO DAS PARTES',
        style: 'sectionHeader'
      },
      {
        text: [
          'CONTRATANTE: ',
          { text: data.contractorName, bold: true },
          ', inscrita no CNPJ sob nº ',
          data.contractorCnpj,
          ', com sede em ',
          data.contractorAddress,
          '.\n\n'
        ]
      },
      {
        text: [
          'CONTRATADA: ',
          { text: data.contractedName, bold: true },
          ', inscrita no CNPJ sob nº ',
          data.contractedCnpj,
          ', com sede em ',
          data.contractedAddress,
          ', neste ato representada por ',
          data.legalRepName,
          ', CPF nº ',
          data.legalRepCpf,
          '.\n\n'
        ]
      },
      {
        text: 'CLÁUSULA PRIMEIRA - DO OBJETO',
        style: 'clausula'
      },
      {
        text: data.object,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'CLÁUSULA SEGUNDA - DO VALOR',
        style: 'clausula'
      },
      {
        text: `O valor total do presente contrato é de ${formatCurrency(data.totalValue)}.`,
        margin: [0, 0, 0, 15]
      },
      {
        text: 'CLÁUSULA TERCEIRA - DA VIGÊNCIA',
        style: 'clausula'
      },
      {
        text: `O presente contrato terá vigência de ${data.duration} meses, a partir da data de sua assinatura.`,
        margin: [0, 0, 0, 15]
      },
      {
        text: [
          '\n\n',
          data.signatureLocation,
          ', ',
          formatDate(data.signatureDate)
        ],
        alignment: 'right',
        margin: [0, 30, 0, 30]
      },
      {
        columns: [
          {
            width: '*',
            text: [
              '_________________________________\n',
              'CONTRATANTE\n',
              data.contractorName,
              '\nCNPJ: ',
              data.contractorCnpj
            ],
            alignment: 'center'
          },
          {
            width: '*',
            text: [
              '_________________________________\n',
              'CONTRATADA\n',
              data.contractedName,
              '\nCNPJ: ',
              data.contractedCnpj
            ],
            alignment: 'center'
          }
        ],
        columnGap: 30
      },
      {
        text: '\n\n'
      },
      {
        columns: [
          {
            width: '*',
            text: [
              '_________________________________\n',
              'TESTEMUNHA 1\n',
              data.witness1Name,
              '\nCPF: ',
              data.witness1Cpf
            ],
            alignment: 'center'
          },
          {
            width: '*',
            text: [
              '_________________________________\n',
              'TESTEMUNHA 2\n',
              data.witness2Name,
              '\nCPF: ',
              data.witness2Cpf
            ],
            alignment: 'center'
          }
        ],
        columnGap: 30
      }
    ],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      sectionHeader: {
        fontSize: 13,
        bold: true,
        margin: [0, 15, 0, 10]
      },
      clausula: {
        fontSize: 12,
        bold: true,
        margin: [0, 15, 0, 10]
      }
    },
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.3
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