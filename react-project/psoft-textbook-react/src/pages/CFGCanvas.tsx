import Navbar from "../components/Navbar";
import { Toolbar } from 'primereact/toolbar';
import "../components/CFGSidebar.css"
import "./CFGCanvas.css";
import React, { MouseEvent, useState, useEffect, useRef } from 'react';
import { ReactFlow, ReactFlowProvider, getViewportForBounds, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import AddNodeOnEdgeDrop from "../components/AddNodeOnEdgeDrop";

export default function CFGCanvas() {

	return (
	<div>
		<Navbar/>
		<ReactFlowProvider>
    		<AddNodeOnEdgeDrop/>
  		</ReactFlowProvider>
  	</div>
	);
}