import React, { useState } from "react";
import "./Forgotpassword.css";
import { Fpassnumber , Fpassotp , Fpasscreate} from "./Fotgotpasswordsub";
import Logingif from '../../images/login.gif'

const Forgotpassword = () => {
    const [fpasspage , setFpasspage] = useState("fpasscreate");
    return(
        <div className="Fpass-main">
            <div className="fpass-imgbox" >
          <img src={Logingif}/>
        </div>
        <div className="Fpass-box">
        {fpasspage === "fmobile" && <Fpassnumber setFpasspage={setFpasspage}/>}
        {fpasspage === "fotp" && <Fpassotp setFpasspage={setFpasspage}/>}
        {fpasspage === "fpasscreate" && <Fpasscreate setFpasspage={setFpasspage}/>}
        </div>
        </div>
    );
};


export default Forgotpassword;