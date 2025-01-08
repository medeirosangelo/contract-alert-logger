import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const UseCaseNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="px-4 py-2 rounded-full border-2 border-primary bg-white min-w-[150px] text-center">
      <span className="text-sm font-medium">{data.label}</span>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(UseCaseNode);