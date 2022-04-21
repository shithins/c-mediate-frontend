import React from "react";
import './Editcomplaint.css';
import CloseIcon from '@mui/icons-material/Close';


const Editcomplaint = ({setAddpopup}) => {
    return(
        <div className="editcom-main">
            <div className="CloseIcon" onClick={ () => setAddpopup("close") }>
            <CloseIcon/>
            </div>
            <h2>Edit complaint</h2>
            <textarea name="Edit-box" >Type here..</textarea>
            <button type="submit">POST</button>
            </div>
    )
};

export default Editcomplaint;