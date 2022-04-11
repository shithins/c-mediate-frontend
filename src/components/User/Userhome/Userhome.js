import React, { useState } from "react";
import "./Userhome.css";
import { useHistory } from "react-router-dom";
import Ucomplaints from "../Usercomplaints/Ucomplaints";
// import exploreimg from '../../../images/explore.svg'
import Usuggestions from "../Usersuggestions/Usugg";
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

        <button>Announcements</button>
      </div>
      <div className="home-popups">
        {showPopup === "complaint" && <Ucomplaints />}
        {showPopup === "suggestions" && <Usuggestions />}
      </div>
    </div>
  );
};

export default Userhome;
