import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";

const contractTemplates = [
  {
    id: "1",
    name: "Contrato de Prestação de Serviços",
    content: `CONTRATO DE PRESTAÇÃO DE SERVIÇOS

Entre as partes abaixo qualificadas:

CONTRATANTE: [Nome/Razão Social], [CPF/CNPJ], com sede em [endereço]
CONTRATADA: [Nome/Razão Social], [CPF/CNPJ], com sede em [endereço]

CLÁUSULA PRIMEIRA - DO OBJETO
O presente contrato tem por objeto a prestação dos seguintes serviços: [descrição dos serviços]

CLÁUSULA SEGUNDA - DO VALOR
Pela prestação dos serviços, a CONTRATANTE pagará à CONTRATADA o valor de R$ [valor] ([valor por extenso])

CLÁUSULA TERCEIRA - DO PRAZO
O presente contrato terá vigência de [prazo] meses, iniciando-se em [data início] e terminando em [data fim]

[Local e Data]

_______________________
CONTRATANTE

_______________________
CONTRATADA

_______________________
TESTEMUNHA 1

_______________________
TESTEMUNHA 2`,
  },
  {
    id: "2",
    name: "Contrato de Compra e Venda",
    content: `CONTRATO DE COMPRA E VENDA

Entre as partes abaixo qualificadas:

VENDEDOR: [Nome/Razão Social], [CPF/CNPJ], com sede em [endereço]
COMPRADOR: [Nome/Razão Social], [CPF/CNPJ], com sede em [endereço]

CLÁUSULA PRIMEIRA - DO OBJETO
O VENDEDOR vende ao COMPRADOR o seguinte bem: [descrição detalhada do bem]

CLÁUSULA SEGUNDA - DO PREÇO
O preço total da venda é de R$ [valor] ([valor por extenso])

CLÁUSULA TERCEIRA - DA FORMA DE PAGAMENTO
O pagamento será realizado da seguinte forma: [condições de pagamento]

[Local e Data]

_______________________
VENDEDOR

_______________________
COMPRADOR

_______________________
TESTEMUNHA 1

_______________________
TESTEMUNHA 2`,
  },
];

export const TemplateEditor = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [content, setContent] = useState("");

  const handleTemplateChange = (templateId: string) => {
    const template = contractTemplates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(templateId);
      setContent(template.content);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      // Here we'll integrate with the backend to generate the PDF
      console.log("Generating PDF with content:", content);
      toast({
        title: "PDF Gerado com Sucesso!",
        description: "O arquivo PDF foi gerado e está pronto para download.",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erro ao Gerar PDF",
        description: "Ocorreu um erro ao gerar o arquivo PDF. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6 text-warm-800">
          Editor de Modelos de Contrato
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-warm-800">
              Selecione o Modelo
            </label>
            <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Escolha um modelo de contrato" />
              </SelectTrigger>
              <SelectContent>
                {contractTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-warm-800">
              Edite o Contrato
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[600px] font-mono"
              placeholder="Selecione um modelo para começar..."
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => setContent("")}
              disabled={!content}
            >
              Limpar
            </Button>
            <Button
              onClick={handleGeneratePDF}
              disabled={!content}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Gerar PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};