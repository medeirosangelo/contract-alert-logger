import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

interface ContractFormData {
  orgao: string;
  tipoOrigem: string;
  dataInicio: string;
  dataTermino: string;
  objeto: string;
  dataAssinatura: string;
  valorContratado: string;
  frequencia: string;
  tipoPessoa: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  veiculoPublicacao: string;
  dataPublicacao: string;
  numeroVeiculo: string;
  naoHouvePublicacao: boolean;
}

const ContractForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContractFormData>({
    orgao: "",
    tipoOrigem: "",
    dataInicio: "",
    dataTermino: "",
    objeto: "",
    dataAssinatura: "",
    valorContratado: "",
    frequencia: "",
    tipoPessoa: "",
    cnpj: "",
    razaoSocial: "",
    nomeFantasia: "",
    veiculoPublicacao: "",
    dataPublicacao: "",
    numeroVeiculo: "",
    naoHouvePublicacao: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "Contrato salvo com sucesso!",
      description: "O contrato foi cadastrado no sistema.",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-warm-800">
          Informações Básicas
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="orgao">Órgão</Label>
            <Input
              id="orgao"
              name="orgao"
              value={formData.orgao}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipoOrigem">Tipo de origem do contrato</Label>
            <Select
              onValueChange={(value) => handleSelectChange("tipoOrigem", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licitacao">Licitação</SelectItem>
                <SelectItem value="dispensa">Dispensa</SelectItem>
                <SelectItem value="inexigibilidade">Inexigibilidade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-warm-800">
          Dados do Contrato
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dataInicio">Data de Início</Label>
            <Input
              type="date"
              id="dataInicio"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataTermino">Data de Término</Label>
            <Input
              type="date"
              id="dataTermino"
              name="dataTermino"
              value={formData.dataTermino}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="objeto">Objeto</Label>
            <Input
              id="objeto"
              name="objeto"
              value={formData.objeto}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataAssinatura">Data de Assinatura</Label>
            <Input
              type="date"
              id="dataAssinatura"
              name="dataAssinatura"
              value={formData.dataAssinatura}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="valorContratado">Valor contratado (R$)</Label>
            <Input
              type="number"
              step="0.01"
              id="valorContratado"
              name="valorContratado"
              value={formData.valorContratado}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequencia">Frequência</Label>
            <Input
              id="frequencia"
              name="frequencia"
              value={formData.frequencia}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-warm-800">Fornecedor</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="tipoPessoa">Tipo de Pessoa</Label>
            <Select
              onValueChange={(value) => handleSelectChange("tipoPessoa", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fisica">Pessoa Física</SelectItem>
                <SelectItem value="juridica">Pessoa Jurídica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="razaoSocial">Razão Social</Label>
            <Input
              id="razaoSocial"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nomeFantasia">Nome Fantasia</Label>
            <Input
              id="nomeFantasia"
              name="nomeFantasia"
              value={formData.nomeFantasia}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-warm-800">
          Dados da Publicação
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="veiculoPublicacao">Veículo de Publicação</Label>
            <Input
              id="veiculoPublicacao"
              name="veiculoPublicacao"
              value={formData.veiculoPublicacao}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dataPublicacao">Data de Publicação</Label>
            <Input
              type="date"
              id="dataPublicacao"
              name="dataPublicacao"
              value={formData.dataPublicacao}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numeroVeiculo">Número do Veículo</Label>
            <Input
              id="numeroVeiculo"
              name="numeroVeiculo"
              value={formData.numeroVeiculo}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center space-x-2 pt-8">
            <Checkbox
              id="naoHouvePublicacao"
              checked={formData.naoHouvePublicacao}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  naoHouvePublicacao: checked as boolean,
                }))
              }
            />
            <label
              htmlFor="naoHouvePublicacao"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Não houve publicação
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancelar</Button>
        <Button type="submit">Salvar dados informados</Button>
      </div>
    </form>
  );
};

export default ContractForm;