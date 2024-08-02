import { EditorProps, useMonaco, Monaco, loader, Editor } from "@monaco-editor/react";
import { useEffect, useRef, } from "react";
import useDafny from "../hooks/useDafny";

export default function DafnyEditor({
  EditorProps,
}: {
  EditorProps: EditorProps;
}) {
  const dafny = useDafny();
  const language = dafny.langDef;
  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.languages.register({ id: "dafny" });

      monaco.languages.setMonarchTokensProvider("dafny", {
        keywords: [
          "class",
          "datatype",
          "codatatype",
          "type",
          "function",
          "ghost",
          "var",
          "method",
          "constructor",
          "module",
          "import",
          "default",
          "as",
          "opened",
          "static",
          "refines",
          "returns",
          "break",
          "then",
          "else",
          "if",
          "label",
          "return",
          "while",
          "print",
          "where",
          "new",
          "parallel",
          "in",
          "this",
          "fresh",
          "choose",
          "match",
          "case",
          "assert",
          "assume",
          "predicate",
          "copredicate",
          "forall",
          "exists",
          "false",
          "true",
          "null",
          "old",
          "calc",
          "iterator",
          "yields",
          "yield",
        ],

        verifyKeywords: [
          "requires",
          "ensures",
          "modifies",
          "reads",
          "free",
          "invariant",
          "decreases",
        ],

        types: [
          "bool",
          "multiset",
          "map",
          "nat",
          "int",
          "object",
          "set",
          "seq",
          "array",
        ],

        brackets: [
          { open: "{", close: "}", token: "delimiter.curly" },
          { open: "[", close: "]", token: "delimiter.square" },
          { open: "(", close: ")", token: "delimiter.parenthesis" },
        ],

        // Dafny uses C# style strings
        escapes:
          /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

        tokenizer: {
          root: [
            // identifiers
            [/array([2-9]\d*|1\d+)/, "type.keyword"],
            [
              /[a-zA-Z'_?\\][\w'?\\]*/,
              {
                cases: {
                  "@keywords": "keyword",
                  "@verifyKeywords": "constructor.identifier",
                  "@types": "type.keyword",
                  "@default": "identifier",
                },
              },
            ],
            [":=", "keyword"],

            // whitespace
            { include: "@whitespace" },

            [/[{}()[\]]/, "@brackets"],
            [/[;,]/, "delimiter"],

            // literals
            [/[0-9]+/, "number"],

            // strings
            [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
            [/"/, "string", "@string"],
          ],

          whitespace: [
            [/[ \t\r\n]+/, "white"],
            [/\/\*/, "comment", "@comment"],
            [/\/\/.*$/, "comment"],
          ],

          comment: [
            [/[^/*]+/, "comment"],
            [/\/\*/, "comment", "@push"], // nested comment
            ["\\*/", "comment", "@pop"],
            [/[/*]/, "comment"],
          ],

          string: [
            [/[^\\"]+/, "string"],
            [/@escapes/, "string.escape"],
            [/\\./, "string.escape.invalid"],
            [/"/, "string", "@pop"],
          ],
        },
      });

    monaco.editor.defineTheme("dafnyTheme", {
      base: "vs",
      inherit: false,
      rules: [
        { token: "keyword", foreground: "AF00DD" },
        { token: "constructor.identifier", foreground: "#AF00DD", fontStyle: "bold" },
        { token: "type.keyword", foreground: "0000FF" },
        { token: "identifier", foreground: "008800" },
        { token: "comment", foreground: "A4A4A4"},
      ],
        colors: {
          "editor.foreground": "#000000",
      },
    });
      
      let cleanup: null | (() => void) = null;
      if (monaco) {

        const { dispose } = monaco.languages.registerCompletionItemProvider(
          "dafny",
          {
            provideCompletionItems: (model, position) => {
              const word = model.getWordUntilPosition(position);
              const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
              };

              return { suggestions: dafny.suggestionsWithRange(range) };
            },
          }
        );
        cleanup = dispose;
      }
      return () => {
        if (!monaco || !cleanup) return;
        cleanup();
      };
    });
  }, []);

   const initialRef : any = null;
   const editorRef = useRef(initialRef);

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  function showValue() {
    globalThis.dafnyCode = editorRef.current!.getValue();
  }

  function clearValue() {
    editorRef.current!.setValue("");
  }

   return (<div><button onClick={clearValue}>Clear</button>
        <Editor {
          ...EditorProps} 
          value={"// Please enter Dafny code below and delete this comment!"}
          onMount={handleEditorDidMount}
          language="dafny"
          theme="dafnyTheme"
          onChange={showValue}
        />
      </div>
    );
}
