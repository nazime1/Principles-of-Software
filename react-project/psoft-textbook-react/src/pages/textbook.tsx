import "./textbook.css";
import Sidebar from "./sidebar";

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
		<a href="https://nazime1.github.io/Principles-of-Software/#/textbook/readme">
		<button>Get Started</button></a>
		</div>
	</>
	)
}