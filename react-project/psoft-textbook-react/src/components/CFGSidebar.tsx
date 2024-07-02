import "./CFGSidebar.css"
import { Toolbar } from 'primereact/toolbar';

export default function CFGSidebar() {
	const startContent = (
		<div>
		<img src="cursor.png" title="Move" className="clicker"></img>
		<img src="oval.png" title="Entry/Exit Node" className="oval"></img>
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