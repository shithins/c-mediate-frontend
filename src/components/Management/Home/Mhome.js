import React, { useState } from "react";
import "./Mhome.css";
import { useHistory } from "react-router-dom";
import Mcomplaints from "../Complaints/Complaints";
import Msuggestion from "../Suggestions/Suggestions";
import Mannouncement from "../Announcement/Announcement";
import Addannouncement from "../Addannouncement/Addannouncement";
import Addstudent from "../Addstudent/Addstudent";
import Editprofile from "../Editprofile/Editprofile";
import Blockedprofile from "../Blockedprofiles/Blockedprofile";
import Gif from "../../Gif/Gif";
const Managehome = ( { setManagementpopup , showManagementpopup}) => {
  const history = useHistory();
  const [showPopup, setPopup] = useState("svg");
  return (
    <div className="Mhome-main">
    {showManagementpopup === "announcement" && (
        <Addannouncement setManagementpopup={setManagementpopup} />
      )}  
      
      {showManagementpopup === "student" && (
        <Addstudent setManagementpopup={setManagementpopup} />
      )}
      
      {showManagementpopup === "profile" && (
        <Editprofile setManagementpopup={setManagementpopup} />
      )}

      {showManagementpopup === "blocked" && (
        <Blockedprofile setManagementpopup={setManagementpopup} />
      )}


      <div className="mhome-btns">
        <button
          onClick={() => setPopup("complaint")}
          style={{ background: showPopup === "complaint" && "#6987cb" }}
        >
          Complaints
        </button>

        <button
          onClick={() => setPopup("suggestions")}
          style={{ background: showPopup === "suggestions" && "#6987cb" }}
        >
          Suggestions
        </button>

        <button
        onClick={() => setPopup("announcements")}
          style={{ background: showPopup === "announcements" && "#6987cb" }}
          >
          Announcements
          </button>

      </div>
     <div className="mhome-popups">
         {showPopup === "complaint" && <Mcomplaints />}
         {showPopup === "suggestions" && <Msuggestion />}
         {showPopup === "announcements" && <Mannouncement />}
         {showPopup === "svg" && <Gif/> }  
        
  </div> 
    </div>
  );
};

export default Managehome;
