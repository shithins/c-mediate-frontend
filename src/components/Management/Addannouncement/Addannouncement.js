import React, { useState } from "react";
import "./Addannouncement.css";
import CloseIcon from "@mui/icons-material/Close";

const Addannouncement = ({ setManagementpopup }) => {
    return(
        <div className="add-ann-main">
        <div className="man-close" onClick={() => setManagementpopup("close")}>
        <CloseIcon /> </div>
            <h2>ADD ANNOUNCEMENTS</h2>
            <input type="text" placeholder="Heading here"/>
            <input type="date" placeholder="Expiry date"/>
            <input type="text" placeholder="Content"/>
            <input type="file"  required/>
            <button>Submit</button>

        </div>
    );
};

export default Addannouncement;