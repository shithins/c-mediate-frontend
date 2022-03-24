    import React from 'react';
    import "./Userhome.css";
    import { useHistory } from "react-router-dom";
    import Ucomplaints from '../Usercomplaints/Ucomplaints';
    // import exploreimg from '../../../images/explore.svg'
    import Usuggestions from '../Usersuggestions/Usugg';
    const Userhome = () => {
        const history = useHistory();
      return (
        <div className="userHome-main">
        <div className='home-btns'>
        
        <button onClick={() => history.push("/ucom")}>Complaints</button>
        
        
        <button onClick={ () => history.push("/usugg")}>Suggestions</button>
        
        
        <button>Announcements</button>
        </div>
        <div className='home-popups'>
        <Ucomplaints/>
        </div> 
        </div>
      )
    };
    
    export default Userhome;