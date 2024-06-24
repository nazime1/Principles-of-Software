import "./landing.css";

export default function Landing() {
    return(
        <>
            <div className="landing">
            <h2>Click on the <b>left icon</b> to use tools, or click on the <b>right icon</b> to read the textbook!</h2>
                <img
                src="Logo.png"
                className="landinglogo"
                style={{display: "inline"}}
                onClick={() => {
                    window.location.href = "/index";
                }}
                />
            <img
            src="color_tree.gif"
            className="textbooklogo"
            style={{display: "inline"}}
            onClick={() => {
                window.location.href = "/textbook";
            }}
            />
            </div>
        </>
    )
}
