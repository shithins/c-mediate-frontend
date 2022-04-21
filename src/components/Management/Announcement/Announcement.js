import React,{ useState } from "react";
import "./Announcement.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteForever';

const Mannouncement = () => {
    return(
        <div className="mann-box-main">
        <div className="mann-content-main">
            <div className="mann-box">
                <h2>Heading</h2>
                <h4>00/00/0000</h4>
              <p>The Lorem ipsum text is derived from sections 
              1.10.32 and 1.10.33 of Cicero's 'De finibus bonorum et
               malorum'.[7][8] The physical source may have been the 
               1914 Loeb Classical Library edition of De finibus, 
               where the Latin text.
              </p>
                <button>Get Details</button>
                <div className="moptions">
                <button><EditIcon/>Edit</button>
                <button><DeleteIcon/>Delete</button>
                </div>
            </div>

            

        </div>
        </div>
    );
};


export default Mannouncement;