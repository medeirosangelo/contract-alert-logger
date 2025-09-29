import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  Info, 
  Zap,
  Lock,
  UserCheck,
  Clock,
  AlertCircle
} from "lucide-react";
import ContractSignaturePanel from "@/components/contract/ContractSignaturePanel";
import { Alert, AlertDescription } from "@/components/ui/alert";

const DigitalSignatureDemo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Dados de exemplo para demonstração
  const mockContractId = "demo-contract-123";
  const mockContractContent = `
CONTRATO DE PRESTAÇÃO DE SERVIÇOS Nº 001/2024

CONTRATANTE: FUNDAÇÃO NACIONAL DOS POVOS INDÍGENAS - FUNAI
CNPJ: 00.000.000/0001-00

CONTRATADO: EMPRESA EXEMPLO LTDA
CNPJ: 11.111.111/0001-11

OBJETO: Prestação de serviços de desenvolvimento de sistema web para gestão de contratos.

VALOR TOTAL: R$ 100.000,00 (cem mil reais)

PRAZO: 12 (doze) meses, contados a partir da assinatura deste contrato.

CLÁUSULAS:
1. Do Objeto e Especificações
2. Do Prazo de Execução  
3. Do Preço e Condições de Pagamento
4. Das Obrigações das Partes
5. Das Penalidades
6. Da Rescisão
7. Das Disposições Gerais

Este contrato é celebrado em conformidade com a Lei nº 8.666/93 e suas alterações.

Local e Data: Boa Vista/RR, 29 de setembro de 2024.

_________________________________
CONTRATANTE

_________________________________  
CONTRATADO
  `.trim();

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-warm-50">
      <Navigation />
      <Header />
      <main className={`${isMobile ? 'ml-0' : 'ml-64'} pt-16 p-6 transition-all duration-300`}>
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-warm-800">Demonstração de Assinatura Digital</h1>
            <p className="text-warm-600">
              Sistema de assinatura digital para contratos com validação criptográfica
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="contract">Contrato Demo</TabsTrigger>
              <TabsTrigger value="signature">Assinatura</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Características principais */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <h3 className="text-lg font-semibold">Segurança Avançada</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-warm-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Hash SHA-256 do documento
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Token único por assinatura
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Timestamp criptográfico
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Rastreamento de alterações
                    </li>
                  </ul>
                </div>

                {/* Validação jurídica */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-8 w-8 text-green-600" />
                    <h3 className="text-lg font-semibold">Validação Jurídica</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-warm-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Identificação do signatário
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Integridade do documento
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Não-repúdio
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Trilha de auditoria
                    </li>
                  </ul>
                </div>

                {/* Facilidade de uso */}
                <div className="bg-white rounded-lg shadow p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-yellow-600" />
                    <h3 className="text-lg font-semibold">Facilidade de Uso</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-warm-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Interface intuitiva
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Assinatura em um clique
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Validação instantânea
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Histórico completo
                    </li>
                  </ul>
                </div>
              </div>

              {/* Informações técnicas */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Como Funciona a Assinatura Digital
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium">1. Documento</h4>
                    <p className="text-sm text-warm-600">
                      O sistema gera um hash SHA-256 do conteúdo do documento
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <UserCheck className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium">2. Identificação</h4>
                    <p className="text-sm text-warm-600">
                      O signatário é identificado através do sistema de autenticação
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                      <Lock className="h-6 w-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium">3. Assinatura</h4>
                    <p className="text-sm text-warm-600">
                      Um token único é gerado e associado ao hash do documento
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <h4 className="font-medium">4. Validação</h4>
                    <p className="text-sm text-warm-600">
                      A assinatura pode ser validada a qualquer momento
                    </p>
                  </div>
                </div>
              </div>

              {/* Avisos importantes */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Versão Demonstrativa:</strong> Este é um protótipo básico de assinatura digital. 
                  Para uso em produção, recomenda-se implementar certificados digitais ICP-Brasil 
                  ou integração com serviços como DocuSign, Adobe Sign ou similares.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="contract" className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Contrato de Demonstração
                </h3>
                
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                    {mockContractContent}
                  </pre>
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Nota:</strong> Este é um contrato fictício usado apenas para demonstração 
                    das funcionalidades de assinatura digital do sistema.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="signature" className="space-y-6">
              <ContractSignaturePanel
                contractId={mockContractId}
                contractContent={mockContractContent}
                onSignatureUpdate={() => {
                  console.log("Assinatura atualizada!");
                }}
              />
              
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Próximos Passos para Implementação Completa
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Certificados Digitais ICP-Brasil</h4>
                      <p className="text-sm text-warm-600">
                        Integração com certificados A1/A3 para assinatura qualificada
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Serviços de Assinatura em Nuvem</h4>
                      <p className="text-sm text-warm-600">
                        DocuSign, Adobe Sign, ou similares para facilidade de uso
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Carimbo de Tempo</h4>
                      <p className="text-sm text-warm-600">
                        Implementação de timestamp qualificado para maior segurança jurídica
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium">Validador de Assinaturas</h4>
                      <p className="text-sm text-warm-600">
                        Interface para verificação e validação de assinaturas por terceiros
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DigitalSignatureDemo;