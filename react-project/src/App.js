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
      <p>Try your hand at filling in the comments and compiling your own Dafny code!</p>
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
          var obj = {
            requester: "postman",
            files: [
            {
            name: "problem.dfy",
            content: Editor.value,
            }
          ]
        }
        const dataToSend = JSON.stringify(obj);
        var xhr = new XMLHttpRequest();
        var url = "http://localhost/compile";
        xhr.open("POST", url, true);
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
