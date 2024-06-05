import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Editor from './components/Editor';

function App() {

  const [openedEditor, setOpenedEditor] = useState('html');

  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState(``);


  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      )
    }, 250);

    return () => clearTimeout(timeOut)
  }, [html, css, js])

  return (
    <div className="App">
      <p>Welcome to the edior</p>
      <div className="editor-container">
        {
          openedEditor === 'dafny' ? (
            <Editor
              language="java"
              displayName="Java"
            />
          ) : openedEditor === 'css' ? (
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              setEditorState={setCss}
            />
          ) : (
            <Editor
              language="javascript"
              displayName="JS"
              value={js}
              setEditorState={setJs}
            />
          )
        }
      </div>
    <Button title="Run" onClick={() => {
          var text = "method add(i1: int, i2: int) returns (result: int)\nrequires i1 >= 0 && i2 >= 0\nensures result == i1 + i2\n{\nresult := 0;\nvar x := i1;\nvar y := i2;\nvar u := 1;\nvar v := 0;\nwhile (x > 0 || y > 0)\ninvariant i1 + i2 == result + u * (x + y + v) && x >= 0 && y >= 0 \ndecreases x + y\n{\nv := v + x % 2 + y % 2;\nx := x / 2;\ny := y / 2; \nresult := result + u * (v % 2);\nu := 2 * u;\nv := v / 2;\n}\nresult := result + u * v;\n}"
          var obj = {
            requester: "postman",
            files: [
            {
            name: "problem.dfy",
            content: text
            }
          ]
        }
        const dataToSend = JSON.stringify(obj);
        var xhr = new XMLHttpRequest({mozSystem: true});
        var url = "http://localhost/compile";
        xhr.open("POST", url, true);
        /*xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost/compile");
        xhr.setRequestHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");*/
        xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
          <div>
        <iframe
          id="dafny_iframe"
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          height="100%"
        />
      </div>
      }
    };
    xhr.send(dataToSend);
  }} />
    </div>
  );
}

export default App;
