    import React from 'react';
    import "./Userhome.css";
    import { useHistory } from "react-router-dom";
    // import exploreimg from '../../../images/explore.svg'

    const Userhome = () => {
        const history = useHistory();
      return (
        <div className="userHome-main">
            <div className="user-complaint-btn">
                <button onClick={() => history.push("/ucom")}>Complaints</button>
            </div>
            <div className="user-sugg-btn">
                <button onClick={ () => history.push("/usugg")}>Suggestions</button>
            </div>
            <div className="user-anno-btn">
                <button>Announcements</button>
            </div>
            
        </div>
      )
    };
    
    export default Userhome;