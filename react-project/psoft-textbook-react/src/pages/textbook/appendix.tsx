import Sidebar from '../../pages/sidebar.tsx';
import appendix from '../../../../../docs/appendix.md';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import showdown from 'showdown';
import './content.css';

export default function Appendix() {
	 const [html, setHTML] = useState("");
	 useEffect(() => {
        fetch(appendix)
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