import React, { useState } from "react";
import "./Editprofile.css"
import CloseIcon from "@mui/icons-material/Close"

const Editprofile = ( {setManagementpopup} ) => {
    return(
        <div className="editProfile-main">
        <div className="man-profile-close" onClick={() => setManagementpopup("close")}>
        <CloseIcon /> </div>
        <h2>Edit Profile </h2>
        <input type="text"  placeholder="Name"/>
        <input type="number" placeholder="Phone number"/>
        <button>Done</button>
        
        </div>
    );
};


export default Editprofile;