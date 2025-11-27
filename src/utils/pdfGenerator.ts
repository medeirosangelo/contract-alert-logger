import jsPDF from 'jspdf';

interface ContractData {
  contract_number: string;
  object: string;
  total_value: number;
  signature_date: string;
  start_date: string;
  end_date: string;
  duration: number;
  contractor?: {
    company_name: string;
    cnpj: string;
    legal_rep_name: string;
    legal_rep_cpf: string;
  };
  contracted?: {
    company_name: string;
    cnpj: string;
    legal_rep_name: string;
    legal_rep_cpf: string;
  };
  payment_term?: string;
  bank?: string;
  agency?: string;
  account?: string;
  adjustment_index?: string;
  price_adjustment_term?: number;
  delay_penalty?: string;
  termination_penalty?: string;
  signature_location?: string;
  general_observations?: string;
}

export const generateContractPDF = (contract: ContractData) => {
  const doc = new jsPDF();
  let yPos = 20;
  const lineHeight = 7;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);

  // Cabeçalho
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTRATO DE PRESTAÇÃO DE SERVIÇOS', pageWidth / 2, yPos, { align: 'center' });
  yPos += lineHeight * 2;

  doc.setFontSize(12);
  doc.text(`Contrato Nº ${contract.contract_number}`, pageWidth / 2, yPos, { align: 'center' });
  yPos += lineHeight * 2;

  // Identificação
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('CONTRATANTE:', margin, yPos);
  yPos += lineHeight;

  doc.setFont('helvetica', 'normal');
  if (contract.contractor) {
    doc.text(`${contract.contractor.company_name}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`CNPJ: ${formatCNPJ(contract.contractor.cnpj)}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Representante Legal: ${contract.contractor.legal_rep_name}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`CPF: ${formatCPF(contract.contractor.legal_rep_cpf)}`, margin, yPos);
    yPos += lineHeight * 1.5;
  }

  doc.setFont('helvetica', 'bold');
  doc.text('CONTRATADA:', margin, yPos);
  yPos += lineHeight;

  doc.setFont('helvetica', 'normal');
  if (contract.contracted) {
    doc.text(`${contract.contracted.company_name}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`CNPJ: ${formatCNPJ(contract.contracted.cnpj)}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`Representante Legal: ${contract.contracted.legal_rep_name}`, margin, yPos);
    yPos += lineHeight;
    doc.text(`CPF: ${formatCPF(contract.contracted.legal_rep_cpf)}`, margin, yPos);
    yPos += lineHeight * 1.5;
  }

  // Objeto do Contrato
  doc.setFont('helvetica', 'bold');
  doc.text('DO OBJETO:', margin, yPos);
  yPos += lineHeight;

  doc.setFont('helvetica', 'normal');
  const objectLines = doc.splitTextToSize(contract.object, maxWidth);
  doc.text(objectLines, margin, yPos);
  yPos += lineHeight * objectLines.length + lineHeight;

  // Valor e Vigência
  doc.setFont('helvetica', 'bold');
  doc.text('DO VALOR E DA VIGÊNCIA:', margin, yPos);
  yPos += lineHeight;

  doc.setFont('helvetica', 'normal');
  doc.text(`Valor Total: ${formatCurrency(contract.total_value)}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Data de Assinatura: ${formatDate(contract.signature_date)}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Início da Vigência: ${formatDate(contract.start_date)}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Término da Vigência: ${formatDate(contract.end_date)}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Duração: ${contract.duration} meses`, margin, yPos);
  yPos += lineHeight * 1.5;

  // Pagamento
  if (contract.payment_term) {
    doc.setFont('helvetica', 'bold');
    doc.text('DO PAGAMENTO:', margin, yPos);
    yPos += lineHeight;

    doc.setFont('helvetica', 'normal');
    const paymentLines = doc.splitTextToSize(contract.payment_term, maxWidth);
    doc.text(paymentLines, margin, yPos);
    yPos += lineHeight * paymentLines.length;

    if (contract.bank) {
      doc.text(`Banco: ${contract.bank} | Agência: ${contract.agency} | Conta: ${contract.account}`, margin, yPos);
      yPos += lineHeight * 1.5;
    }
  }

  // Nova página se necessário
  if (yPos > 250) {
    doc.addPage();
    yPos = 20;
  }

  // Reajuste
  if (contract.adjustment_index) {
    doc.setFont('helvetica', 'bold');
    doc.text('DO REAJUSTE DE PREÇOS:', margin, yPos);
    yPos += lineHeight;

    doc.setFont('helvetica', 'normal');
    doc.text(`Índice: ${contract.adjustment_index}`, margin, yPos);
    yPos += lineHeight;
    if (contract.price_adjustment_term) {
      doc.text(`Periodicidade: ${contract.price_adjustment_term} meses`, margin, yPos);
      yPos += lineHeight * 1.5;
    }
  }

  // Penalidades
  if (contract.delay_penalty) {
    doc.setFont('helvetica', 'bold');
    doc.text('DAS PENALIDADES:', margin, yPos);
    yPos += lineHeight;

    doc.setFont('helvetica', 'normal');
    doc.text('Multa por Atraso:', margin, yPos);
    yPos += lineHeight;
    const delayLines = doc.splitTextToSize(contract.delay_penalty, maxWidth);
    doc.text(delayLines, margin, yPos);
    yPos += lineHeight * delayLines.length;

    if (contract.termination_penalty) {
      doc.text('Multa por Rescisão:', margin, yPos);
      yPos += lineHeight;
      const terminationLines = doc.splitTextToSize(contract.termination_penalty, maxWidth);
      doc.text(terminationLines, margin, yPos);
      yPos += lineHeight * terminationLines.length + lineHeight;
    }
  }

  // Observações
  if (contract.general_observations) {
    if (yPos > 230) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.text('OBSERVAÇÕES GERAIS:', margin, yPos);
    yPos += lineHeight;

    doc.setFont('helvetica', 'normal');
    const obsLines = doc.splitTextToSize(contract.general_observations, maxWidth);
    doc.text(obsLines, margin, yPos);
    yPos += lineHeight * obsLines.length + lineHeight * 2;
  }

  // Assinaturas
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  }

  yPos += lineHeight * 3;
  doc.setFont('helvetica', 'normal');
  
  if (contract.signature_location) {
    doc.text(`${contract.signature_location}, ${formatDate(contract.signature_date)}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += lineHeight * 4;
  }

  // Linha para assinaturas
  const signatureWidth = 60;
  const leftX = margin + 10;
  const rightX = pageWidth - margin - signatureWidth - 10;

  doc.line(leftX, yPos, leftX + signatureWidth, yPos);
  doc.line(rightX, yPos, rightX + signatureWidth, yPos);
  yPos += lineHeight;

  doc.setFontSize(10);
  if (contract.contractor) {
    doc.text(contract.contractor.legal_rep_name, leftX + (signatureWidth / 2), yPos, { align: 'center' });
  }
  if (contract.contracted) {
    doc.text(contract.contracted.legal_rep_name, rightX + (signatureWidth / 2), yPos, { align: 'center' });
  }
  yPos += lineHeight;

  doc.text('CONTRATANTE', leftX + (signatureWidth / 2), yPos, { align: 'center' });
  doc.text('CONTRATADA', rightX + (signatureWidth / 2), yPos, { align: 'center' });

  // Salvar PDF
  doc.save(`contrato-${contract.contract_number.replace(/\//g, '-')}.pdf`);
};

// Funções auxiliares de formatação
const formatCurrency = (value: number): string => {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatCPF = (cpf: string): string => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
  return cpf;
};

const formatCNPJ = (cnpj: string): string => {
  if (!cnpj) return '';
  const cleaned = cnpj.replace(/\D/g, '');
  if (cleaned.length === 14) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
  return cnpj;
};
