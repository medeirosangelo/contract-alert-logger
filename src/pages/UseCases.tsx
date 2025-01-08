import { useCallback } from 'react';
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import ActorNode from '@/components/uml/ActorNode';
import UseCaseNode from '@/components/uml/UseCaseNode';

const initialNodes = [
  {
    id: 'customer',
    type: 'actor',
    position: { x: 50, y: 100 },
    data: { label: 'Cliente' },
  },
  {
    id: 'cashier',
    type: 'actor',
    position: { x: 50, y: 300 },
    data: { label: 'Caixa' },
  },
  {
    id: 'maintenance',
    type: 'actor',
    position: { x: 50, y: 500 },
    data: { label: 'Manutenção' },
  },
  {
    id: 'bank',
    type: 'actor',
    position: { x: 650, y: 200 },
    data: { label: 'Banco' },
  },
  {
    id: 'withdraw',
    type: 'useCase',
    position: { x: 300, y: 50 },
    data: { label: 'Sacar Dinheiro' },
  },
  {
    id: 'transfer',
    type: 'useCase',
    position: { x: 300, y: 150 },
    data: { label: 'Transferir Fundos' },
  },
  {
    id: 'validate',
    type: 'useCase',
    position: { x: 300, y: 250 },
    data: { label: 'Validar Usuário' },
  },
  {
    id: 'deposit',
    type: 'useCase',
    position: { x: 300, y: 350 },
    data: { label: 'Depositar Fundos' },
  },
  {
    id: 'refill',
    type: 'useCase',
    position: { x: 300, y: 450 },
    data: { label: 'Reabastecer Máquina' },
  },
];

const initialEdges = [
  { id: 'e1', source: 'customer', target: 'withdraw' },
  { id: 'e2', source: 'customer', target: 'transfer' },
  { id: 'e3', source: 'customer', target: 'deposit' },
  { id: 'e4', source: 'cashier', target: 'deposit' },
  { id: 'e5', source: 'maintenance', target: 'refill' },
  { id: 'e6', source: 'withdraw', target: 'bank' },
  { id: 'e7', source: 'transfer', target: 'bank' },
  { id: 'e8', source: 'validate', target: 'bank' },
];

const nodeTypes = {
  actor: ActorNode,
  useCase: UseCaseNode,
};

const UseCases = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: any) => {
    setEdges((eds) => addEdge(params, eds));
  }, [setEdges]);

  return (
    <div className="min-h-screen bg-warm-100">
      <Navigation />
      <Header />
      <main className="ml-64 pt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold mb-8">Diagrama de Casos de Uso</h1>
            <div style={{ width: '100%', height: '600px' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
              >
                <Controls />
                <Background />
              </ReactFlow>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCases;