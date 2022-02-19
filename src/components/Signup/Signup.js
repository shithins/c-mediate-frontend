import React, { useState } from "react";
import './Signup.css';
import { SignupNumber } from "./Signupsub";

export default function Signup ()  {
    const [page,setPage]=useState("mobile")
    return(
        <div className="SignupMain">
            <div className="signup-box">
                {page ==="mobile"&&<SignupNumber/>}
                {/* {page ==='otp'&&} */}

            </div>
        </div>

    )
};

