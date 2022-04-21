import React from "react";
import './Editsuggestion.css';
import CloseIcon from '@mui/icons-material/Close';


const Editsuggestion = ({setAddpopup}) => {
    return(
        <div className="editsugg-main">
            <div className="CloseIcon" onClick={ () => setAddpopup("close") }>
            <CloseIcon/>
            </div>
            <h2>" Your suggestions here.. "</h2>
            <textarea name="suggEdit-box" >Type here..</textarea>
            <button type="submit">POST</button>
            
            </div>
    )
};

export default Editsuggestion;