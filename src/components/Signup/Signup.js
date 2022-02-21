import React, { useState } from "react";
import './Signup.css';
import { SignupNumber, Verifyotp, Cpassword } from "./Signupsub";

export default function Signup ()  {
    const [page,setPage]=useState("cpass")
    return(
        <div className="SignupMain">
            <div className="signup-box">
                {page ==="mobile"&&<SignupNumber/>}
                {page ==='otp'&& <Verifyotp/>}
                {page ==='cpass'&& <Cpassword/>}
            </div>
        </div>

    )
};

