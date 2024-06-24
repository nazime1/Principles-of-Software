import Sidebar from '../../pages/sidebar.tsx';
import processes from '../../../../../docs/processes.md';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import showdown from 'showdown';
import './content.css';

export default function Processes() {
	 const [html, setHTML] = useState("");
	 useEffect(() => {
        fetch(processes)
            .then(data => data.text())
            .then(text => {
                const converter = new showdown.Converter();
                setHTML(converter.makeHtml(text));
            })
    }, []);
	return (
	<>
		<Sidebar/>
		<div className="textbook-content">
		{parse(html)}
		</div>
	</>
	)
}