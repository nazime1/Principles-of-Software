import React, { useRef, useCallback, MouseEvent, useState } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  getNodesBounds, 
  getViewportForBounds,
  NodeTypes,
  type Edge,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Sidebar from './Sidebar';
import './DragDrop.css';
import type * as CSS from 'csstype';
import ShapeNode from './ShapeNode';
import { toPng } from 'html-to-image';
import useUndoRedo from './useUndoRedo';

export default function DragDrop() {
  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Entry' },
      position: { x: 250, y: 5 },
    },
  ];
  const nodeTypes: NodeTypes = {
    shape: ShapeNode,
  };
  let id = 0;
  const getId = () => `dndnode_${id++}`;
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowInstance = useReactFlow();
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      takeSnapshot();
      switch (type) {
        case 'rect':
          var stateNode = {
            id: type + getId(),
            type: 'shape',
            position,
            data: { type: 'rectangle', color: 'white', label: '', },
          };
          setNodes((nds) => nds.concat(stateNode));
          break;
        case 'diamond':
          var branchNode = {
            id: type + getId(),
            type: 'shape',
            position,
            data: { type: 'diamond', color: 'white', label: '', },
          };
          setNodes((nds) => nds.concat(branchNode));
          break;
        default:
          var newNode = {
            id: 'exit' + getId(),
            type: 'output',
            position,
            data: { label: 'Exit', },
          }
          setNodes((nds) => nds.concat(newNode));
          break;
      }
    },
    [screenToFlowPosition],
  );

  const divStyle: CSS.Properties = {
    width: '1500px',
    height: '1000px',
    marginTop: "50px"
  };

  const onEdgeClick = (event: MouseEvent, edge: Edge) => {
    setEdges((eds) => 
      eds.map((ed) => {
        if (globalThis.branchVal === 'trueBranch') {
          takeSnapshot();
          return ed.id === edge.id ? {...edge, data: {...edge.data, }, label: "true",} : ed;
        } else if (globalThis.branchVal === 'falseBranch') {
          takeSnapshot();
          return ed.id === edge.id ? {...edge, data: {...edge.data, }, label: "false",} : ed;
        }
        return edge;
        }
      ),
    );
  };

  function downloadImage(dataUrl) {
    const a = document.createElement('a');

    a.setAttribute('download', 'CFG.png');
    a.setAttribute('href', dataUrl);
    a.click();
  }

  const { getNodes } = useReactFlow();
    const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
      const nodesBounds = getNodesBounds(getNodes());
      const imageWidth = '1500';
      const imageHeight = '1500';
      const viewport = getViewportForBounds(
          nodesBounds,
          1500,
          1500,
          0.5,
          2,
          0,
      );

      toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
        backgroundColor: '#FFFFFF',
        width: 1500,
        height: 1500,
        style: {
          width: imageWidth,
          height: imageHeight,
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      }).then(downloadImage);
  };

  const conMode : ConnectionMode = ConnectionMode.Loose;

  return (
    <div className="dndflow">
      <div className="reactflow-wrapper" ref={reactFlowWrapper} style={divStyle}>
      <button className="download-btn" onClick={onClick}>Download Image</button>
      <button className="undo-btn" onClick={undo}>Undo</button>
      <button className="redo-btn" onClick={redo}>Redo</button>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          nodeTypes={nodeTypes}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onEdgeClick={onEdgeClick}
          connectionMode={conMode}
          fitView
        >
        </ReactFlow>
      </div>
      <Sidebar/>
    </div>
  );
};