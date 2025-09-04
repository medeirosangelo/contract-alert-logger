import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, Bell, FileText, Users } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold mb-8">Como podemos ajudá-lo</h1>
            
            <div className="relative mb-8">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 py-6 text-lg"
                placeholder="Insira sua palavra chave"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                <Bell className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="text-sm text-gray-600 mb-2">Perguntas sobre</h3>
                <p className="font-semibold">Tudo sobre o SWGCM</p>
              </Card>

              <Card className="p-6 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                <FileText className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="text-sm text-gray-600 mb-2">Perguntas sobre</h3>
                <p className="font-semibold">Como criar um contrato</p>
              </Card>

              <Card className="p-6 bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer">
                <Users className="w-8 h-8 text-pink-500 mb-4" />
                <h3 className="text-sm text-gray-600 mb-2">Perguntas sobre</h3>
                <p className="font-semibold">Como cadastrar pessoa física</p>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Perguntas frequentes</h2>
                <a href="#" className="text-red-600 hover:underline">Ver tudo</a>
              </div>

              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Como funciona a plataforma SWGCM?</h3>
                  <p className="text-gray-600">O SWGCM é um sistema web desenvolvido para gestão integrada de contratos e monitoramento da produtividade, oferecendo alertas automatizados, dashboards interativos e funcionalidades que apoiem a tomada de decisões estratégicas.</p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Como fazer o cadastro de pessoa jurídica?</h3>
                  <p className="text-gray-600">Acesse o menu "Pessoas" {'->'} "Cadastro de Pessoa Jurídica". Preencha todas as informações obrigatórias incluindo CNPJ, dados da empresa, representante legal e informações bancárias.</p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Como o sistema de alertas funciona?</h3>
                  <p className="text-gray-600">O sistema monitora automaticamente os contratos e exibe alertas coloridos: Verde (mais de 120 dias), Laranja (60 dias) e Vermelho (30 dias ou menos) para vencimento.</p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Como gerar relatórios de contratos?</h3>
                  <p className="text-gray-600">No dashboard, utilize os filtros por período e status, depois clique em "Exportar" para gerar relatórios em PDF com os dados selecionados.</p>
                </Card>

                <Card className="p-6">
                  <h3 className="font-semibold mb-2">Quais são os níveis de permissão?</h3>
                  <p className="text-gray-600">O sistema possui três níveis: Admin (acesso total), Gestor (gerenciamento de contratos) e Colaborador (visualização e cadastros básicos).</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;