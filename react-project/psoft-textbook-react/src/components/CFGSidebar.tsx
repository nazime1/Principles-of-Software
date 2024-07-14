import "./CFGSidebar.css"
import { Toolbar } from 'primereact/toolbar';

export default function CFGSidebar() {
	globalThis.setDraggable = true;

	function clickDrag() {
		console.log(globalThis.setDraggable);
		globalThis.setDraggable = true;
		console.log(globalThis.setDraggable);
	}

	function dragOff() {
		console.log(globalThis.setDraggable);
		globalThis.setDraggable = false;
		console.log(globalThis.setDraggable);
	}

	const startContent = (
		<div>
		<img src="cursor.png" title="Move" onClick={clickDrag} className="clicker"></img>
		<img src="oval.png" title="Entry/Exit Node" onClick={dragOff} className="oval"></img>
		<img src="rectangle.png" title="Statement Node" className="rectangle"></img>
		<img src="diamond.png" title="Branch Node" className="diamond"></img>
		<img src="text.png" title="Text" className="text"></img>
		<img src="true.png" title="True" className="true"></img>
		<img src="false.png" title="False" className="false"></img>
		<img src="arrow.png" title="Branch" className="arrow"></img>
		</div>
	);

	return (
		<Toolbar start={startContent} className="CFGsidebar"/>
	);
}