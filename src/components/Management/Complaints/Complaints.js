import React, {  useState } from "react";
import "./Complaints.css";
import samimg from "../../../images/img1.webp"
const Mcomplaints = () => {
    const [options, setOptions] = useState("All");
    return(
       <div className="mcom-box-main">
       <div className="mcom-btns">
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

      <div className="mcom-content-main">
        

          <div className="mcom-box">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a 
          
            </p>
           <img src={samimg} />
        <div className="status-btns"> 
        <button>Reply</button>
        <button>Solved</button>
        <button>Block request</button>

        </div>
          </div>

      </div>
       
       </div>
    );
};

export default Mcomplaints;