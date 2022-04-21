import React from "react";
import './Addsuggestions.css';
import CloseIcon from '@mui/icons-material/Close';


const Addsuggestions = ({setAddpopup}) => {
    return(
        <div className="addsugg-main">
            <div className="CloseIcon" onClick={ () => setAddpopup("close") }>
            <CloseIcon/>
            </div>
            <h2>" Your suggestions here.. "</h2>
            <textarea name="sugg-box" >Type here..</textarea>
            <button type="submit">POST</button>
            
            </div>
    )
};

export default Addsuggestions;