import { Package, Component } from "lucide-react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  MiniMap
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
            Contract
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + number: string<br/>
            + object: string<br/>
            + value: number<br/>
            + startDate: Date<br/>
            + endDate: Date
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + create()<br/>
            + update()<br/>
            + delete()<br/>
            + generatePDF()
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
            PhysicalPerson
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + name: string<br/>
            + cpf: string<br/>
            + email: string<br/>
            + phone: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + create()<br/>
            + update()<br/>
            + delete()
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
            LegalPerson
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + companyName: string<br/>
            + cnpj: string<br/>
            + email: string<br/>
            + phone: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + create()<br/>
            + update()<br/>
            + delete()
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
            ContractAlert
          </div>
          <div className="text-sm text-left">
            + id: number<br/>
            + contractId: number<br/>
            + type: string<br/>
            + date: Date<br/>
            + status: string
          </div>
          <div className="text-sm text-left mt-2 pt-2 border-t">
            + create()<br/>
            + update()<br/>
            + markAsRead()
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