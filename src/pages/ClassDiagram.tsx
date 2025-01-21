import { Package, Component } from "lucide-react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  EdgeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 250, y: 0 },
    data: { 
      label: (
        <div className="p-2">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2">
            <Package className="w-4 h-4" />
            Contrato
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + numeroContrato: string<br/>
            + objeto: string<br/>
            + valorTotal: decimal<br/>
            + dataAssinatura: Date<br/>
            + dataPublicacao: Date<br/>
            + prazoAjuste: number<br/>
            + indiceReajuste: string<br/>
            + status: string<br/>
            + unidadeOrcamentaria: string<br/>
            + naturezaDespesa: string<br/>
            + fonteRecurso: string<br/>
            + programaTrabalho: string<br/>
            + observacoesGerais: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar(): void<br/>
            + atualizar(): void<br/>
            + excluir(): void<br/>
            + gerarPDF(): void<br/>
            + renovar(): void<br/>
            + calcularVencimento(): Date<br/>
            + verificarStatus(): string
          </div>
        </div>
      )
    }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 0, y: 200 },
    data: { 
      label: (
        <div className="p-2">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2">
            <Component className="w-4 h-4" />
            Pessoa Física
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + nomeCompleto: string<br/>
            + cpf: string<br/>
            + rg: string<br/>
            + dataNascimento: Date<br/>
            + endereco: string<br/>
            + numero: string<br/>
            + complemento: string<br/>
            + bairro: string<br/>
            + cidade: string<br/>
            + estado: string<br/>
            + cep: string<br/>
            + telefone: string<br/>
            + email: string<br/>
            + cargo: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar(): void<br/>
            + atualizar(): void<br/>
            + excluir(): void<br/>
            + validarCPF(): boolean<br/>
            + verificarDuplicidade(): boolean
          </div>
        </div>
      )
    }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 500, y: 200 },
    data: { 
      label: (
        <div className="p-2">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2">
            <Component className="w-4 h-4" />
            Pessoa Jurídica
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + razaoSocial: string<br/>
            + nomeFantasia: string<br/>
            + cnpj: string<br/>
            + inscricaoEstadual: string<br/>
            + endereco: string<br/>
            + numero: string<br/>
            + complemento: string<br/>
            + bairro: string<br/>
            + cidade: string<br/>
            + estado: string<br/>
            + cep: string<br/>
            + telefone: string<br/>
            + email: string<br/>
            + representanteLegal: string<br/>
            + cpfRepresentante: string<br/>
            + cargoRepresentante: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar(): void<br/>
            + atualizar(): void<br/>
            + excluir(): void<br/>
            + validarCNPJ(): boolean<br/>
            + verificarDuplicidade(): boolean
          </div>
        </div>
      )
    }
  },
  {
    id: '4',
    type: 'default',
    position: { x: 250, y: 400 },
    data: { 
      label: (
        <div className="p-2">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2">
            <Component className="w-4 h-4" />
            Alerta de Contrato
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + contratoId: number<br/>
            + tipo: string<br/>
            + dataAlerta: Date<br/>
            + status: string<br/>
            + mensagem: string<br/>
            + prioridade: string<br/>
            + diasParaVencimento: number
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar(): void<br/>
            + atualizar(): void<br/>
            + marcarComoLido(): void<br/>
            + notificarUsuarios(): void<br/>
            + calcularPrioridade(): string
          </div>
        </div>
      )
    }
  },
  {
    id: '5',
    type: 'default',
    position: { x: 750, y: 200 },
    data: { 
      label: (
        <div className="p-2">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2">
            <Component className="w-4 h-4" />
            Usuário
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + nome: string<br/>
            + email: string<br/>
            + senha: string<br/>
            + cargo: string<br/>
            + permissoes: string[]<br/>
            + ultimoAcesso: Date<br/>
            + status: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar(): void<br/>
            + atualizar(): void<br/>
            + excluir(): void<br/>
            + autenticar(): boolean<br/>
            + alterarSenha(): void<br/>
            + verificarPermissoes(): string[]
          </div>
        </div>
      )
    }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: '1 : n' },
  { id: 'e1-3', source: '1', target: '3', label: '1 : n' },
  { id: 'e1-4', source: '1', target: '4', label: '1 : n' },
  { id: 'e1-5', source: '1', target: '5', label: 'n : n' }
];

const ClassDiagram = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Diagrama de Classes</h1>
      <div className="w-full h-[800px] border rounded-lg bg-white">
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default ClassDiagram;