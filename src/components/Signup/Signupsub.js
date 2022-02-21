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

export const Cpassword = () => {
    return(
        <div className="create-pass">
            <h2>Create new password</h2>
            {/* <label htmlFor="text">NEW PASSWORD</label> */}
            <div className="pass-box1">
            <input type="text"  placeholder="Enter new password" required/>
            </div>
            <div className="pass-box2">
            <input type="text" placeholder="Re-enter the password" required/>
            </div>
            <button type="submit">CONFIRM</button>
        </div>
    )
};