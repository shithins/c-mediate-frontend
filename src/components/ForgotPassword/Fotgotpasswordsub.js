import React, { useState } from "react";
import "./Forgotpassword.css";

export const Fpassnumber = ({setFpasspage}) =>
{
    return(
<div className="fpass-num-main">
<label htmlFor="text">Forgot Password</label>
<input type="number" placeholder="Enter your registered mobile number" />
<button type="submit">Get OTP</button>
</div>
    );
};

export const Fpassotp = ({setFpasspage}) =>
{
    return(
        <div className="Fpassotp-main">
        <label>Enter OTP</label>
        <input type="number"  placeholder="OTP here"/>
        <button type="submit">Verify</button>
        </div>
    );
};


export const Fpasscreate = ({setFpasspage}) => 
{
    return(
        <div className="Fpasscreate-main">
        <h2>Change Password</h2>
        <input type="password" placeholder="New password " />
        <input type="password" placeholder="Re-enter new password"/>
        <button>Change</button>
        </div>
    );
};