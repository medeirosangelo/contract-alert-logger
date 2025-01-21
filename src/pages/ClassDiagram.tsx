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
            + numero: string<br/>
            + objeto: string<br/>
            + valorTotal: number<br/>
            + dataAssinatura: Date<br/>
            + dataPublicacao: Date<br/>
            + prazoAjuste: number<br/>
            + indiceReajuste: string<br/>
            + status: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar()<br/>
            + atualizar()<br/>
            + excluir()<br/>
            + gerarPDF()<br/>
            + renovar()
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
            + nome: string<br/>
            + cpf: string<br/>
            + rg: string<br/>
            + dataNascimento: Date<br/>
            + endereco: string<br/>
            + telefone: string<br/>
            + email: string<br/>
            + cargo: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar()<br/>
            + atualizar()<br/>
            + excluir()<br/>
            + validarCPF()
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
            + telefone: string<br/>
            + email: string<br/>
            + representanteLegal: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar()<br/>
            + atualizar()<br/>
            + excluir()<br/>
            + validarCNPJ()
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
            + prioridade: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + criar()<br/>
            + atualizar()<br/>
            + marcarComoLido()<br/>
            + notificarUsuarios()
          </div>
        </div>
      )
    }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: '1 : n' },
  { id: 'e1-3', source: '1', target: '3', label: '1 : n' },
  { id: 'e1-4', source: '1', target: '4', label: '1 : n' }
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