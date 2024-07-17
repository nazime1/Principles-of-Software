import Navbar from "../components/Navbar";
import { Toolbar } from 'primereact/toolbar';
import "../components/CFGSidebar.css"
import React, { MouseEvent, useState, useEffect, useRef } from 'react';
import { ReactFlow, ReactFlowProvider, getViewportForBounds, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DragDrop from "../components/DragDrop";

export default function CFGCanvas() {

	return (
	<div>
		<Navbar/>
		<ReactFlowProvider>
    		<DragDrop/>
  		</ReactFlowProvider>
  	</div>
	);
}