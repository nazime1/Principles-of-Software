import Navbar from "../components/Navbar";
import CFGSidebar from "../components/CFGSidebar";
import "./CFGCanvas.css";
import React from 'react';
import { Stage, Layer, Text } from 'react-konva';
import { Html } from 'react-konva-utils';

export default function CFGCanvas() {
	return (
		<html>
		<Stage id={"stage1"} width={window.innerWidth} height={window.innerHeight} draggable={true}>
		<Layer>
		<Html>
		<CFGSidebar/>
		</Html>
		<Text fill={"black"} fontSize={100} text="Under construction!"/>
		</Layer>
		</Stage>
		<Navbar/>
		</html>
	);
}