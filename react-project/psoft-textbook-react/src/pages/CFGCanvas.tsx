import Navbar from "../components/Navbar";
import { Toolbar } from 'primereact/toolbar';
import React, { MouseEvent, useState, useEffect, useRef } from 'react';
import { ReactFlow, ReactFlowProvider, getViewportForBounds, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import DragDrop from "../components/DragDrop";
import { Helmet } from 'react-helmet';

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