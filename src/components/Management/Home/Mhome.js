import React, { useState } from "react";
import "./Mhome.css";
import { useHistory } from "react-router-dom";
import Mcomplaints from "../Complaints/Complaints";
import Msuggestion from "../Suggestions/Suggestions";
import Mannouncement from "../Announcement/Announcement";
import Addannouncement from "../Addannouncement/Addannouncement";
import Addstudent from "../Addstudent/Addstudent";
import Editprofile from "../Editprofile/Editprofile";
import Students from "../Students/Students";
import Gif from "../../Gif/Gif";
import EditStudent from "../EditStudent/EditStudent";
import EditAnnouncement from "../Editannouncement/EditAnnouncement";
const Managehome = ({ setManagementpopup, showManagementpopup }) => {
  const history = useHistory();
  const [showPopup, setPopup] = useState("svg");
  const [editUser, setEditUser] = useState({});
  const[editAnnouncement,setEditAnnouncement]=useState({});
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
        <Students
          setManagementpopup={setManagementpopup}
          setEditUser={setEditUser}
        />
      )}
      {showManagementpopup === "edituser" && (
        <EditStudent
          editUser={editUser}
          setManagementpopup={setManagementpopup}
        />
      )}
      {showManagementpopup === "editannouncement" && (
        <EditAnnouncement editAnnouncement={editAnnouncement}  setManagementpopup={setManagementpopup} />
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
        {showPopup === "announcements" && (
          <Mannouncement setEditAnnouncement={setEditAnnouncement} setManagementpopup={setManagementpopup} />
        )}
        {showPopup === "svg" && <Gif />}
      </div>
    </div>
  );
};

export default Managehome;
