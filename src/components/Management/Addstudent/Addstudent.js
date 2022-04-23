import React, { useState } from "react";
import './Addstudent.css';
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import Axios from '../../../constant/axios'
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";



const Addstudent = ({setManagementpopup}) => {
    const [name,setName]=useState('')
    const [mobile,setMobile]=useState('')
    const [loading,setLoading]=useState(false)

    const addHandler=()=>{
        if(!name || !mobile) return infoToast('Missing data')
        setLoading(true)
        Axios.post('/user/add',{name,mobile}).then(({data})=>{
            setLoading(false)
            if(data.status){
                successToast('Student added')
                setMobile('')
                setName('')
            }else infoToast(data.message||'Failed added ')

        }).catch(e=>{
            setLoading(false)
            errorToast(e.message||'network error')
        })
    }
    return(
        <div className="add-student-main">
        <div className="man-student-close" onClick={() => setManagementpopup("close")}>
        <CloseIcon /> </div>
        <h2>Add student </h2>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Student Name" />
        <input type="number" value={mobile} placeholder="Phone Number" onChange={(e)=>setMobile(e.target.value)} />
        <button onClick={addHandler}>{loading ? (
          <Box sx={{ width: "100%" }}>
            Adding
            <LinearProgress />
          </Box>
        ) : (
          "Add student"
        )}</button>
        </div>
    );
};

export default Addstudent;