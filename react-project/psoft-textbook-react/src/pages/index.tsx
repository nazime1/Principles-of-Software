import Navbar from "../components/Navbar";
import { useState } from "react";
import { post } from "../lib/api";
import { ThreeDots } from "react-loader-spinner";
import DafnyEditor from "../components/DafnyEditor";

//Create Routing File
interface ErrorObject {
  fileName: string;
  line: number;
  column: number;
  errorMessage: string;
}

export default function Index() {
  const [data, setData] = useState("");
  const [code, setCode] = useState("// Please enter dafny code below and delete this comment!");
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    setLoading(true);
      var obj = {
        requester: "postman",
        files: [
          {
            name: "problem.dfy",
            content: globalThis.dafnyCode
          }
        ]
      }
    const targetURL = "https://cloudrunservice-xl7gt6abwa-wl.a.run.app/compile";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', targetURL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        setLoading(false);
        setData(xhr.responseText);
      }
    }
    xhr.send(JSON.stringify(obj));
  };


  /*const handleRun = () => {
    setLoading(true);
     var obj = {
        requester: "postman",
        files: [
          {
            name: "problem.dfy",
            content: globalThis.dafnyCode
          }
        ]
      }
    const targetURL = "https://cloudrunservice-xl7gt6abwa-wl.a.run.app/run";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', targetURL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
        setLoading(false);
        setData(xhr.responseText);
      }
    }
    xhr.send(JSON.stringify(obj));
  };*/

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      //console.log(value);
      setCode(value);
      //console.log(code);
    }
  };
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        className="screen"
        style={{ paddingTop: "50px", width: "100%", overflow: "hidden" }}
      >
        <div style={{ width: "50%", justifyContent: "left" }}>

          <DafnyEditor
            EditorProps={{
              height: "92vh",
              width: "50vw",
              onChange: handleEditorChange,
              defaultLanguage: "dafny",
            }}
          />
        </div>
        <div className="flex flex-col justify-center relative pl-8">
          <div className=" flex-grow">
            {loading ? (
              <ThreeDots color="gray" height={100} width={100} />
            ) : (
              data
            )}
          </div>
          <div className="flex flex-row justify-evenly max-h-11 mb-4">
            <button onClick={handleVerify}>Verify Dafny</button>
          </div>
        </div>
      </div>
    </div>
  );
}