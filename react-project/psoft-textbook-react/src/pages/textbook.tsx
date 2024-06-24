import "./textbook.css";
import Sidebar from "./sidebar.tsx";

export default function Textbook() {
	return (
	<>
		<div className="main-cover">
		<Sidebar/>
		<img
		src="color_tree.gif"
		className="logo"
		/>
		<h1>Principles of Software</h1>
		<h2>The Textbook.</h2>
		<li>Summer 2024 | version 0.1</li>
		<br/>
		<a href="https://github.com/nazime1/Principles-of-Software">
			<button>GitHub</button></a>
		<a href="/textbook/readme">
		<button>Get Started</button></a>
		</div>
	</>
	)
}