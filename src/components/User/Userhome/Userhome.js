import React, { useState } from "react";
import "./Userhome.css";
import { useHistory } from "react-router-dom";
import Ucomplaints from "../Usercomplaints/Ucomplaints";
// import exploreimg from '../../../images/explore.svg'
import Usuggestions from "../Usersuggestions/Usugg";
import Uannouncements from "../Userannouncements/Uannouncements";
const Userhome = () => {
  const history = useHistory();
  const [showPopup, setPopup] = useState("svg");
  return (
    <div className="userHome-main">
      <div className="home-btns">
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
      <div className="home-popups">
        {showPopup === "complaint" && <Ucomplaints />}
        {showPopup === "suggestions" && <Usuggestions />}
        {showPopup === "announcements" && <Uannouncements />}
        
      </div>
    </div>
  );
};

export default Userhome;
