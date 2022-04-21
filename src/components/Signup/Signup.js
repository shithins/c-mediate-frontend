import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import './Signup.css';
import { SignupNumber, Verifyotp, Cpassword } from "./Signupsub";
import Logingif from '../../images/login.gif'

export default function Signup ()  {
    const [page,setPage]=useState("mobile")
    const [loading,setLoading]=useState(false)
    const [mobile,setMobile] = useState("");
    const [otp,setOtp] =useState("")
    const history=useHistory();

    
    return(
        <div className="SignupMain">
            <div className="signup-imgbox" >
          <img src={Logingif}/>
        </div>
            <div className="signup-box">
                {page ==="mobile"&&<SignupNumber setPage={setPage} mobile={mobile} setMobile={setMobile} loading={loading} setLoading={setLoading} setOtp={setOtp} />}
                {page ==='otp'&& <Verifyotp setPage={setPage} mobile={mobile} otp={otp} setOtp={setOtp} loading={loading} setLoading={setLoading}/>}
                {page ==='cpass'&& <Cpassword  mobile={mobile} otp={otp} loading={loading} setLoading={setLoading}/>}
            <div className="fpass">
            <h4 onClick={ () => history.push("/login")}>Login</h4>
      
        </div>
            </div>
          
        </div>

    )
};

