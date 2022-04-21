import React, { useState } from "react";
import "./Userhome.css";
import { useHistory } from "react-router-dom";
import Ucomplaints from "../Usercomplaints/Ucomplaints";
import Usuggestions from "../Usersuggestions/Usugg";
import Uannouncements from "../Userannouncements/Uannouncements";
import Addcomplaint from "../UserAddcomplaints/Addcomplaint";
import Addsuggestions from "../UserAddsuggestions/Addsuggestions";
import Editsuggestion from "../Editsuggestion/Editsuggestion";
import Editcomplaint from "../Editcomplaint/Editcomplaint";
import Gif from "../../Gif/Gif";

const Userhome = ({ setAddpopup, showAddpopup }) => {
  const history = useHistory();
  const [showPopup, setPopup] = useState("svg");
  const [editPop, setEditPop] = useState("close");
  const [selectedSuggestion, setSelectedSuggestion] = useState({});
  const [selectedComplaint, setSelectedComplaint] = useState({});
  const [suggestion, setSuggestion] = useState([]);
  const [complaints, setComplaints] = useState([]);
  return (
    <div className="userHome-main">
      {showAddpopup === "complaint" && (
        <Addcomplaint setAddpopup={setAddpopup} />
      )}
      {showAddpopup === "suggestion" && (
        <Addsuggestions setAddpopup={setAddpopup} />
      )}
      {editPop === "suggestion" && (
        <Editsuggestion
          setEditPop={setEditPop}
          setSelectedSuggestion={setSelectedSuggestion}
          selectedSuggestion={selectedSuggestion}
          suggestion={suggestion}
          setSuggestion={setSuggestion}
        />
      )}
      {editPop == "complaint" && (
        <Editcomplaint
          selectedComplaint={selectedComplaint}
          setSelectedComplaint={setSelectedComplaint}
          setComplaints={setComplaints}
            complaints={complaints}
            setEditPop={setEditPop}
        />
      )}
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
        {showPopup === "complaint" && (
          <Ucomplaints
            setSelectedComplaint={setSelectedComplaint}
            setEditPop={setEditPop}
            setComplaints={setComplaints}
            complaints={complaints}
          />
        )}
        {showPopup === "suggestions" && (
          <Usuggestions
            setSelectedSuggestion={setSelectedSuggestion}
            setEditPop={setEditPop}
            suggestion={suggestion}
            setSuggestion={setSuggestion}
          />
        )}
        {showPopup === "announcements" && <Uannouncements />}
      </div>
     {showPopup ==="svg" && <Gif/>}
    </div>
  );
};

export default Userhome;
