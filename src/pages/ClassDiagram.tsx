import { Package, Component } from "lucide-react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    type: 'default',
    position: { x: 400, y: 0 },
    data: { 
      label: (
        <div className="p-4 min-w-[400px]">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2 text-xl">
            <Package className="w-6 h-6" />
            Contrato
          </div>
          <div className="text-base text-left space-y-1">
            <p className="font-semibold border-b pb-1">Atributos:</p>
            + id: number<br/>
            + numeroContrato: string<br/>
            + objeto: string<br/>
            + valorTotal: decimal<br/>
            + dataAssinatura: Date<br/>
            + dataPublicacao: Date<br/>
            + prazoAjuste: number<br/>
            + indiceReajuste: string<br/>
            + status: ContractStatus<br/>
            + unidadeOrcamentaria: string<br/>
            + naturezaDespesa: string<br/>
            + fonteRecurso: string<br/>
            + programaTrabalho: string<br/>
            + observacoesGerais: string
          </div>
          <div className="text-base text-left mt-4 space-y-1">
            <p className="font-semibold border-b pb-1">Métodos:</p>
            + criar(): void // Cria novo contrato<br/>
            + atualizar(): void // Atualiza dados do contrato<br/>
            + excluir(): void // Remove contrato do sistema<br/>
            + gerarPDF(): void // Gera documento em PDF<br/>
            + renovar(): void // Renova contrato existente<br/>
            + calcularVencimento(): Date // Calcula data de vencimento<br/>
            + verificarStatus(): ContractStatus // Verifica status atual
          </div>
        </div>
      )
    }
  },
  {
    id: '2',
    type: 'default',
    position: { x: 0, y: 300 },
    data: { 
      label: (
        <div className="p-4 min-w-[400px]">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2 text-xl">
            <Component className="w-6 h-6" />
            Pessoa Física
          </div>
          <div className="text-base text-left space-y-1">
            <p className="font-semibold border-b pb-1">Atributos:</p>
            + id: number<br/>
            + nomeCompleto: string<br/>
            + cpf: string<br/>
            + rg: string<br/>
            + dataNascimento: Date<br/>
            + endereco: Endereco<br/>
            + telefone: string<br/>
            + email: string<br/>
            + cargo: string
          </div>
          <div className="text-base text-left mt-4 space-y-1">
            <p className="font-semibold border-b pb-1">Métodos:</p>
            + criar(): void // Cadastra nova pessoa<br/>
            + atualizar(): void // Atualiza cadastro<br/>
            + excluir(): void // Remove cadastro<br/>
            + validarCPF(): boolean // Valida CPF<br/>
            + verificarDuplicidade(): boolean // Verifica duplicatas
          </div>
        </div>
      )
    }
  },
  {
    id: '3',
    type: 'default',
    position: { x: 800, y: 300 },
    data: { 
      label: (
        <div className="p-4 min-w-[400px]">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2 text-xl">
            <Component className="w-6 h-6" />
            Pessoa Jurídica
          </div>
          <div className="text-base text-left space-y-1">
            <p className="font-semibold border-b pb-1">Atributos:</p>
            + id: number<br/>
            + razaoSocial: string<br/>
            + nomeFantasia: string<br/>
            + cnpj: string<br/>
            + inscricaoEstadual: string<br/>
            + endereco: Endereco<br/>
            + telefone: string<br/>
            + email: string<br/>
            + representanteLegal: PessoaFisica<br/>
            + cargoRepresentante: string
          </div>
          <div className="text-base text-left mt-4 space-y-1">
            <p className="font-semibold border-b pb-1">Métodos:</p>
            + criar(): void // Cadastra nova empresa<br/>
            + atualizar(): void // Atualiza cadastro<br/>
            + excluir(): void // Remove cadastro<br/>
            + validarCNPJ(): boolean // Valida CNPJ<br/>
            + verificarDuplicidade(): boolean // Verifica duplicatas
          </div>
        </div>
      )
    }
  },
  {
    id: '4',
    type: 'default',
    position: { x: 400, y: 600 },
    data: { 
      label: (
        <div className="p-4 min-w-[400px]">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2 text-xl">
            <Component className="w-6 h-6" />
            Alerta de Contrato
          </div>
          <div className="text-base text-left space-y-1">
            <p className="font-semibold border-b pb-1">Atributos:</p>
            + id: number<br/>
            + contratoId: number<br/>
            + tipo: AlertType<br/>
            + dataAlerta: Date<br/>
            + status: AlertStatus<br/>
            + mensagem: string<br/>
            + prioridade: Priority<br/>
            + diasParaVencimento: number
          </div>
          <div className="text-base text-left mt-4 space-y-1">
            <p className="font-semibold border-b pb-1">Métodos:</p>
            + criar(): void // Cria novo alerta<br/>
            + atualizar(): void // Atualiza alerta<br/>
            + marcarComoLido(): void // Marca alerta como lido<br/>
            + notificarUsuarios(): void // Envia notificações<br/>
            + calcularPrioridade(): Priority // Define prioridade
          </div>
        </div>
      )
    }
  },
  {
    id: '5',
    type: 'default',
    position: { x: 400, y: 300 },
    data: { 
      label: (
        <div className="p-4 min-w-[400px]">
          <div className="flex items-center gap-2 font-bold border-b pb-2 mb-2 text-xl">
            <Component className="w-6 h-6" />
            Usuário
          </div>
          <div className="text-base text-left space-y-1">
            <p className="font-semibold border-b pb-1">Atributos:</p>
            + id: number<br/>
            + nome: string<br/>
            + email: string<br/>
            + senha: string<br/>
            + cargo: string<br/>
            + permissoes: UserRole[]<br/>
            + ultimoAcesso: Date<br/>
            + status: UserStatus
          </div>
          <div className="text-base text-left mt-4 space-y-1">
            <p className="font-semibold border-b pb-1">Métodos:</p>
            + criar(): void // Cria novo usuário<br/>
            + atualizar(): void // Atualiza dados<br/>
            + excluir(): void // Remove usuário<br/>
            + autenticar(): boolean // Valida credenciais<br/>
            + alterarSenha(): void // Altera senha<br/>
            + verificarPermissoes(): UserRole[] // Verifica acessos
          </div>
        </div>
      )
    }
  }
];

const initialEdges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    label: '1 : n',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#2563eb' }
  },
  { 
    id: 'e1-3', 
    source: '1', 
    target: '3', 
    label: '1 : n',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#2563eb' }
  },
  { 
    id: 'e1-4', 
    source: '1', 
    target: '4', 
    label: '1 : n',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#2563eb' }
  },
  { 
    id: 'e1-5', 
    source: '5', 
    target: '1', 
    label: 'gerencia',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#dc2626' }
  },
  { 
    id: 'e2-5', 
    source: '5', 
    target: '2', 
    label: 'gerencia',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#dc2626' }
  },
  { 
    id: 'e3-5', 
    source: '5', 
    target: '3', 
    label: 'gerencia',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#dc2626' }
  },
  { 
    id: 'e4-5', 
    source: '5', 
    target: '4', 
    label: 'gerencia',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#dc2626' }
  }
];

const ClassDiagram = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        minZoom={0.2}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
      >
        <Background />
        <Controls />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.id) {
              case '1':
                return '#93c5fd';
              case '5':
                return '#fca5a5';
              default:
                return '#d1d5db';
            }
          }}
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
    </div>
  );
};

export default ClassDiagram;
