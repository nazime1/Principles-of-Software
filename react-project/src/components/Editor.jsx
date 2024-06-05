import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/material.css';

import 'codemirror/theme/mdn-like.css';
import 'codemirror/theme/the-matrix.css';
import 'codemirror/theme/night.css';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/clike/clike';

import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';

import bitwise_add from './bitwise-add.txt';
import dutch from './dutch.txt';
import loopyfactorial from './loopyfactorial.txt';
import mul from './mul.txt';
import power from './power.txt';

import { Controlled as ControlledEditorComponent } from 'react-codemirror2';

const dafnyArray = [];

fetch(bitwise_add)
  .then(b => b.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(dutch)
  .then(d => d.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(loopyfactorial)
  .then(l => l.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(mul)
  .then(mul => mul.text())
  .then(text => {
    dafnyArray.push(text);
  });

fetch(power)
  .then(p => p.text())
  .then(text => {
    dafnyArray.push(text);
  });

const Editor = ({ language, value, setEditorState }) => {

  const [theme, setTheme] = useState("dracula")
  const handleChange = (editor, data, value) => {
    setEditorState(value);
  }

  const themeArray = ['dracula', 'material', 'mdn-like', 'the-matrix', 'night']

  return (
    <div className="editor-container">
      <div style={{marginBottom: "10px"}}>
        <label for="cars">Choose a theme: </label>
        <select name="theme" onChange={(el) => {
          setTheme(el.target.value)
        }}>
          {
            themeArray.map( theme => (
              <option value={theme}>{theme}</option>
            ))
          }
        </select>
      </div>
      <ControlledEditorComponent
        onBeforeChange={handleChange}
        value= {dafnyArray[Math.floor(Math.random() * 5)]}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumbers: true,
          theme: theme,
          autoCloseTags: true,
          autoCloseBrackets: true, 
        }}
      />
    </div>
  )
}

export default Editor
