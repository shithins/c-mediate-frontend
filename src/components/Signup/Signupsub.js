import React from "react";
import './Signup.css';

export const SignupNumber = () => {
    return(
        <div className="signup-num">
            <label htmlFor="number"> SIGNUP </label>
            <input type="text" name="mobile" placeholder="Mobile Number" />
            <button type="submit" >Get OTP</button>

        </div>
    )
};

export const Verifyotp = () => {
    return(
        <div className="verify-otp">
            <h2>Enter your OTP here..</h2>
            <input type="text" placeholder="OTP here" required/>
            <button type="submit">Verify</button>
        </div>
    )
};