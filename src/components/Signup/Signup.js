import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import './Signup.css';
import { SignupNumber, Verifyotp, Cpassword } from "./Signupsub";

export default function Signup ()  {
    const [page,setPage]=useState("mobile")
    const history=useHistory();
    return(
        <div className="SignupMain">
            <div className="signup-box">
                {page ==="mobile"&&<SignupNumber/>}
                {page ==='otp'&& <Verifyotp/>}
                {page ==='cpass'&& <Cpassword/>}
            <div className="fpass">
            <h4 onClick={ () => history.push("/login")}>Login</h4>
      
        </div>
            </div>
        </div>

    )
};

