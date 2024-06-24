import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isImageHighlighted, setIsImageHighlighted] = useState(false);

  const handleMouseDown = () => {
    setIsImageHighlighted(true);
  };

  const handleMouseUp = () => {
    setIsImageHighlighted(false);
    window.location.href =
      "https://www.cs.rpi.edu/academics/courses/spring24/csci2600/";
  };

  return (
    <>
      <div
        className="navbar"
        style={{ width: "max-content", margin: "0 auto" }}
      >
        <div className="flex" style={{ justifyContent: "center"}}>
          <Link to="/index">
            <button>Dafny Verifier</button>
          </Link>
          <Link to="/HoareTriple">
            <button>Hoare Triples</button>
          </Link>
        </div>
        <div>
          <Link to="https://faculty.rpi.edu/konstantin-kuzmin">
            <button>Kuzmin</button>
          </Link>
        </div>
      </div>
    </>
  );
}
