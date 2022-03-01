import React, { useState } from "react";
import './Signup.css';
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Axios from '../../constant/axios'
import { errorToast, infoToast, successToast } from "../../constant/toast";

export const SignupNumber = ({setPage,mobile,setMobile,loading,setLoading,setOtp}) => {
    
    
    const submitHandler= async()=>{
        let verified = await JSON.parse(localStorage.getItem('otp'))
        
        if(verified?.mobile == mobile){ 
            setOtp(verified?.otp)
            successToast("Already verified this number ..")
            setPage('cpass')
            return;
        }

        if(!mobile) return errorToast("Missing data")
        setLoading(true)
        Axios.post("/auth/register/send-otp",{mobile}).then(res=>{
            setLoading(false)
            if(res.data.status){
                successToast(res?.data?.message)
                setPage('otp')
            }else{
                errorToast(res?.data?.message || "something wrong" )
                infoToast("please try again ..")
            }
        }).catch(e=>{
            setLoading(false)
            errorToast("something went wrong ..")
            infoToast("Please try again..")
        })
    }

    return(
        <div className="signup-num">
            <label htmlFor="number"> SIGNUP </label>
            <input type="text" name="mobile" onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile Number" />
            <button type="submit" onClick={submitHandler} > {loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              "Get OTP"
            )}</button>

        </div>
    )
};

export const Verifyotp = ({setPage,mobile,otp,setOtp,loading,setLoading}) => {
    
    const submitHandler=()=>{
        if(!otp) return errorToast("Missing data")
        setLoading(true)
        Axios.post("/auth/register/verify-otp",{otp,mobile}).then(res=>{
            setLoading(false)
            if(res.data.status){
                localStorage.setItem("otp",JSON.stringify({otp,mobile}))
                successToast(res?.data?.message)
                setPage('cpass')
            }else{
                errorToast(res?.data?.message || "something wrong")
                infoToast("please try again..")
            }
        }).catch(e=>{
            setLoading(false)
            errorToast("something wrong ")
            infoToast("please try again..")
        })
    }
    return(
        <div className="verify-otp">
            <h2>Enter your OTP here..</h2>
            <input type="text" onChange={(e)=>setOtp(e.target.value)} placeholder="OTP here" required/>
            <button type="submit" onClick={submitHandler}>{loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              "Verify"
            )}</button>
        </div>
    )
};

export const Cpassword = ({loading,setLoading,otp,mobile}) => {
    const [password,setPassword]= useState("")
    const [vPassword,setVpassword]=useState("") 
    const submitHandler=()=>{
        if(password == vPassword && password && vPassword){
          setLoading(true)
            Axios.post('/auth/register/create-password',{mobile,otp,password}).then(res=>{
               setLoading(false)
                if(res?.data?.status){
                    successToast("Password created..")
                    localStorage.setItem("user", JSON.stringify(res?.data?.profile));
                    window.location.href='/login'
                }else{
                    errorToast(res?.data?.message || "something wrong")
                    infoToast("please try again ")
                }
            }).catch(e=>{
                setLoading(false)
                errorToast("something wrong")
                infoToast("please try again ..")
            })
        }else infoToast("Check password..")

    }
    return(
        <div className="create-pass">
            <h2>Create new password</h2>
            {/* <label htmlFor="text">NEW PASSWORD</label> */}
            <div className="pass-box1">
            <input type="text" onChange={(e)=>setPassword(e.target.value)} placeholder="Enter new password" required/>
            </div>
            <div className="pass-box2">
            <input type="text" onChange={(e)=>setVpassword(e.target.value)} placeholder="Re-enter the password" required/>
            </div>
            <button type="submit" onClick={submitHandler}>{loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              "Confirm"
            )}</button>
        </div>
    )
};