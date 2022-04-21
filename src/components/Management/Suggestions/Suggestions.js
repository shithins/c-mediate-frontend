import React, { useState } from "react";
import "./Suggestions.css";


const Msuggestion = () => {

    const [options, setOptions] = useState("All");

    return(
        <div className="msugg-box-main">
        <div className="msugg-btns">
        <button
          onClick={() => setOptions("All")}
          style={{ background: options === "All" && "#ab72dc" }}
        >
          All
        </button>
    
        <button
          onClick={() => setOptions("Blocked")}
          style={{ background: options === "Blocked" && "#ab72dc" }}
        >
          Blocked
        </button>
      </div>

      <div className="msugg-content-main">
      <div className="msugg-box">
        <p>The Lorem ipsum text is derived from sections 
        1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et
         malorum'.[7][8] The physical source may have been the 
         1914 Loeb Classical Library edition of De finibus, 
         where the Latin text, presented on the left-hand (even) pages,
          breaks off on page 34 with "Neque porro quisquam est qui do-"
           and continues on page 36 with "lorem ipsum ...", suggesting 
          </p>
          <button>Block</button>
      </div>


        </div>
        </div>
    );
};


export default Msuggestion;