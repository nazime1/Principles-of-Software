import {
  NodeResizer,
  type NodeProps,
  useStore,
  Handle,
  Position,
  useKeyPress,
  useReactFlow,
  useUpdateNodeInternals,
} from '@xyflow/react';

import { useCallback, useState } from 'react';

import Shape from './shape';
import Diamond from './diamond';
import { type ShapeType } from './shapes';
import NodeLabel from './label';

export type ShapeNodeData = {
  id: string,
  position,
  sourcePosition?,
  targetPosition?,
  selected?,
  dragHandle?,
  selectable?,
  deletable?,
  draggable?,
  parentId?,
  data,
  width?: number;
  height?: number;
  type: ShapeType;
  color: string;
};

function ShapeNode({ id, selected, data }: NodeProps<ShapeNodeData>) {
  const { color, type } = data;
  const { setNodes } = useReactFlow();
  const handleStyle = { backgroundColor: "#784be8" };
  const rightHandleStyle = { backgroundColor: "#784be8", marginRight: "130px" }

  return (
    <div className="shapeNode">
      <Shape
        type={type}
        width={120}
        height={40}
        fill={'white'}
        strokeWidth={2}
        stroke={'black'}
      />
      <Handle
        style={handleStyle}
        id='top'
        type='target'
        position={Position.Top}
        isConnectable={true}
      />
      <Handle
        style={handleStyle}
        id='bottom'
        type='source'
        position={Position.Bottom}
        isConnectable={true}
      />
      <NodeLabel placeholder={"Node"}/>
    </div>
  );
}

export default ShapeNode;