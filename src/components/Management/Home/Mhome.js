import React, { useState } from "react";
import "./Mhome.css";
import { useHistory } from "react-router-dom";
import Mcomplaints from "../Complaints/Complaints";
import Msuggestion from "../Suggestions/Suggestions";
import Mannouncement from "../Announcement/Announcement";
const Managehome = ( {setAddpopup , showAddpopup}) => {
  const history = useHistory();
  const [showPopup, setPopup] = useState("svg");
  return (
    <div className="Mhome-main">
    
    
      <div className="mhome-btns">
        <button
          onClick={() => setPopup("complaint")}
          style={{ background: showPopup === "complaint" && "darkcyan" }}
        >
          Complaints
        </button>

        <button
          onClick={() => setPopup("suggestions")}
          style={{ background: showPopup === "suggestions" && "darkcyan" }}
        >
          Suggestions
        </button>

        <button
        onClick={() => setPopup("announcements")}
          style={{ background: showPopup === "announcements" && "darkcyan" }}
          >
          Announcements
          </button>

      </div>
     <div className="mhome-popups">
         {showPopup === "complaint" && <Mcomplaints />}
         {showPopup === "suggestions" && <Msuggestion />}
         {showPopup === "announcements" && <Mannouncement />}
        
  </div> 
    </div>
  );
};

export default Managehome;
