import React, { useState } from "react";
import "./Editcomplaint.css";
import CloseIcon from "@mui/icons-material/Close";

const Editcomplaint = ({
  setEditPop,
  complaints,
  setComplaints,
  setSelectedComplaint,
  selectedComplaint,
}) => {
    const [message,setMessage]=useState(selectedComplaint.message)
    const [loading,setLoading]=useState(false)
    

  return (
    <div className="editcom-main">
      <div className="CloseIcon" onClick={() => setAddpopup("close")}>
        <CloseIcon />
      </div>
      <h2>Edit complaint</h2>
      <textarea name="Edit-box">Type here..</textarea>
      <button type="submit">POST</button>
    </div>
  );
};

export default Editcomplaint;
