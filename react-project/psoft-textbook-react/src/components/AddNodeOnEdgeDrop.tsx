import React, { MouseEvent, useState, useEffect, useRef, useCallback } from 'react';
import { ReactFlow, useNodesState, useEdgesState, addEdge, useReactFlow, ReactFlowProvider, Position, NodeTypes, getNodesBounds, getViewportForBounds,
type Edge } from '@xyflow/react';
import "./AddNodeOnEdgeDrop.css";
import { Toolbar } from 'primereact/toolbar';
import "./CFGSidebar.css";
import type * as CSS from 'csstype';
import ShapeNode from './ShapeNode';
import { toPng } from 'html-to-image';
import useUndoRedo from './useUndoRedo';

export default function AddNodeOnEdgeDrop() {

	const initialNodes = [
  	{
    	id: '0',
    	type: 'input',
    	data: { label: 'Entry' },
    	position: { x: 0, y: 50 },
  		},
	];

  const nodeTypes: NodeTypes = {
    shape: ShapeNode,
  };
	const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [ shapeId, setShapeId ] = useState(1);
  const [currentNode, setCurrentNode] = useState('');
  const [nodeType, setNodeType] = useState('');
  const [branchType, setBranchType] = useState('');
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowInstance = useReactFlow();
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  const onConnect = useCallback((params) => {
     takeSnapshot();
	   connectingNodeId.current = null;
	   setEdges((eds) => addEdge(params, eds));
  }, []);

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.id;
    switch (id) {
      case "oval":
        // do stuff to change to entry/exit node
        setNodeType('output');
        break;
      case "rectangle":
        // do stuff to change to statement node
        setNodeType('default');
        break;
      case "diamond":
        // do stuff to change to branch node
        setNodeType('shape');
        break;
      case "true":
        // do stuff to change to true branch label
        setBranchType('trueBranch');
        break;
      case "false":
        // do stuff to change to false branch label
        setBranchType('falseBranch');
        break;
      }
      var items = Array.from(document.getElementsByClassName(e.currentTarget.className) as HTMLCollectionOf<HTMLElement>);
      for (let item of items) {
        item.style.backgroundColor = '#333332';
      }
      e.currentTarget.style.backgroundColor = '#4f4f4d';
  };

	const onConnectStart = useCallback((event, { nodeId, handleId }) => {
    takeSnapshot();
    connectingNodeId.current = nodeId;
  	}, []);

  	const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;
      takeSnapshot();

      const conNodeId = (connectingNodeId.current) as string;

      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        setShapeId(shapeId + 1);
        const id = nodeType + shapeId;
        switch (nodeType) {
          case "output":
            let exitNode = {
              id,
              type: nodeType,
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              data: { label: "Exit", },
              origin: [0.5, 0.0],
            };
            setNodes((nds) => nds.concat(exitNode));
            break;
          case "shape":
            let branchNode = {
              id,
              type: nodeType,
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              data: { type: 'diamond', color: 'white', label: '', },
              origin: [0.5, 0.0],
            };
            setNodes((nds) => nds.concat(branchNode));
            break;
          default:
            let stateNode = {
              id,
              type: 'shape',
              position: screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
              }),
              data: { type: 'rectangle', color: 'white', label: '', },
              origin: [0.5, 0.0],
            };
            setNodes((nds) => nds.concat(stateNode));
        }
        if (nodeType === 'shape') {
          setEdges((eds) =>
            eds.concat({ id, source: conNodeId, target: id, targetHandle: 'top', label: '', } as Edge),
          );
        } else if (conNodeId.includes("shape")) {
            setEdges((eds) =>
              eds.concat({ id, source: conNodeId, target: id, sourceHandle: 'bottom', label: '', } as Edge),
            );
        } else {
          setEdges((eds) =>
            eds.concat({ id, source: conNodeId, target: id, label: '', } as Edge),
          );
        }
      }
    },
    [screenToFlowPosition, nodeType, shapeId],
  );

  const divStyle: CSS.Properties = {
    width: '1500px',
    height: '1000px',
    marginTop: "50px"
  };

  const btnStyle: CSS.Properties = {
    marginLeft: "1000px",
    marginBottom: "100px"
  };

  const startContent = (
    <div>
    <img src="oval.png" className="icon" id="oval" title="Entry/Exit Node" onClick={handleClick}></img>
    <img src="rectangle.png" className="icon" id="rectangle" title="Statement Node" onClick={handleClick}></img>
    <img src="diamond.png"  className="icon" id="diamond" title="Branch Node" onClick={handleClick}></img>
    <img src="true.png" className="icon" id="true" title="True" onClick={handleClick}></img>
    <img src="false.png" className="icon"id="false" title="False" onClick={handleClick}></img>
    </div>
  );

  const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    setEdges((eds) =>
      eds.map((ed) => {
        if (branchType === 'trueBranch') {
          return ed.id === edge.id ? {...edge, data: {...edge.data, }, label: "true",} : ed;
        } else if (branchType === 'falseBranch') {
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

  return (
    <div className="wrapper" ref={reactFlowWrapper} style={divStyle}>
    <Toolbar start={startContent} className="CFGsidebar"/>
    <button className="download-btn" onClick={onClick} style={btnStyle}>Download Image</button>
    <button className="undo-btn" onClick={undo}>Undo</button>
    <button className="redo-btn" onClick={redo}>Redo</button>
      	<ReactFlow
        		nodes={nodes}
        		edges={edges}
            nodeTypes={nodeTypes}
        		onNodesChange={onNodesChange}
        		onEdgesChange={onEdgesChange}
        		onConnect={onConnect}
        		onConnectStart={onConnectStart}
        		onConnectEnd={onConnectEnd}
            onEdgeClick={onEdgeClick}
        		fitView
        		fitViewOptions={{ padding: 2 }}
        		nodeOrigin={[0, 0]}>
        </ReactFlow>
    	</div>
  		);
  	};