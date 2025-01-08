import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const ActorNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="flex flex-col items-center w-[100px]">
      {/* Cabeça */}
      <div className="w-8 h-8 rounded-full border-2 border-primary mb-1" />
      
      {/* Corpo */}
      <div className="w-[2px] h-10 bg-primary" />
      
      {/* Braços */}
      <div className="relative">
        <div className="absolute w-8 h-[2px] bg-primary -top-8 -left-3 rotate-45" />
        <div className="absolute w-8 h-[2px] bg-primary -top-8 -right-3 -rotate-45" />
      </div>
      
      {/* Pernas */}
      <div className="relative">
        <div className="absolute w-8 h-[2px] bg-primary top-0 -left-3 -rotate-45" />
        <div className="absolute w-8 h-[2px] bg-primary top-0 -right-3 rotate-45" />
      </div>
      
      {/* Label */}
      <div className="mt-8 text-sm text-center">{data.label}</div>
      
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default memo(ActorNode);