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
  // Atores
  {
    id: 'admin',
    type: 'actor',
    position: { x: 50, y: 200 },
    data: { label: 'Administrador' },
  },
  {
    id: 'user',
    type: 'actor',
    position: { x: 50, y: 400 },
    data: { label: 'Usuário' },
  },
  
  // Casos de Uso - Contratos
  {
    id: 'manage-contracts',
    type: 'useCase',
    position: { x: 300, y: 100 },
    data: { label: 'Gerenciar Contratos' },
  },
  {
    id: 'view-contracts',
    type: 'useCase',
    position: { x: 300, y: 200 },
    data: { label: 'Visualizar Contratos' },
  },
  {
    id: 'create-contract',
    type: 'useCase',
    position: { x: 300, y: 300 },
    data: { label: 'Criar Contrato' },
  },
  {
    id: 'edit-contract',
    type: 'useCase',
    position: { x: 300, y: 400 },
    data: { label: 'Editar Contrato' },
  },
  
  // Casos de Uso - Pessoas
  {
    id: 'manage-people',
    type: 'useCase',
    position: { x: 500, y: 100 },
    data: { label: 'Gerenciar Pessoas' },
  },
  {
    id: 'register-physical',
    type: 'useCase',
    position: { x: 500, y: 200 },
    data: { label: 'Cadastrar Pessoa Física' },
  },
  {
    id: 'register-legal',
    type: 'useCase',
    position: { x: 500, y: 300 },
    data: { label: 'Cadastrar Pessoa Jurídica' },
  },
  
  // Casos de Uso - Alertas
  {
    id: 'view-alerts',
    type: 'useCase',
    position: { x: 500, y: 400 },
    data: { label: 'Visualizar Alertas' },
  },
];

const initialEdges = [
  // Conexões do Administrador
  { id: 'e1', source: 'admin', target: 'manage-contracts' },
  { id: 'e2', source: 'admin', target: 'manage-people' },
  { id: 'e3', source: 'admin', target: 'view-alerts' },
  { id: 'e4', source: 'admin', target: 'create-contract' },
  { id: 'e5', source: 'admin', target: 'edit-contract' },
  { id: 'e6', source: 'admin', target: 'register-physical' },
  { id: 'e7', source: 'admin', target: 'register-legal' },
  
  // Conexões do Usuário
  { id: 'e8', source: 'user', target: 'view-contracts' },
  { id: 'e9', source: 'user', target: 'view-alerts' },
];

const nodeTypes = {
  actor: ActorNode,
  useCase: UseCaseNode,
};

const UseCases = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: any) => {
    setEdges((eds) => addEdge(params, eds));
  };

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
                <MiniMap />
              </ReactFlow>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UseCases;