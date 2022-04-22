import React, { useState } from "react";
import './Addstudent.css';
import CloseIcon from "@mui/icons-material/Close";

const Addstudent = ({setManagementpopup}) => {
    return(
        <div className="add-student-main">
        <div className="man-student-close" onClick={() => setManagementpopup("close")}>
        <CloseIcon /> </div>
        <h2>Add student </h2>
        <input type="text" placeholder="Student Name" />
        <input type="number" placeholder="Phone Number" />
        <button>Add student</button>
        </div>
    );
};

export default Addstudent;