import React, { useEffect, useState } from "react";
import './Editsuggestion.css';
import CloseIcon from '@mui/icons-material/Close';
import { infoToast ,errorToast,successToast} from "../../../constant/toast";
import Axios from '../../../constant/axios'
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Editsuggestion = ({setEditPop,setSelectedSuggestion,selectedSuggestion,suggestion,setSuggestion}) => {
    const [message,setMessage]=useState(selectedSuggestion.message)
    const [loading,setLoading]=useState(false)
    const submitHandler=()=>{
        if(!message) return infoToast('missing data')
        setLoading(true)
        Axios.post('/suggestion/edit',{message,_id:selectedSuggestion._id}).then(({data})=>{
            setLoading(false)
            if(data.status){
                successToast('edited successfully')
                let newArr =[]
                suggestion.map(i=>{
                    if(i._id === selectedSuggestion._id){
                        i.message=message
                    }
                    newArr.push(i)
                })
                setSuggestion(newArr)
                setEditPop("close")
            }else infoToast(data.message ||"something wrong")
        }).catch(e=>{
                setLoading(false)
                errorToast('something')
        })

    }
    useEffect(()=>{
        return ()=>{
            setSelectedSuggestion({})
        }
    },[])
    return(
        <div className="editsugg-main">
            <div className="CloseIcon" onClick={ () => setEditPop("close") }>
            <CloseIcon/>
            </div>
            <h2>" Edit your suggestion "</h2>
            <textarea name="suggEdit-box" value={message} onChange={(e)=>setMessage(e.target.value)} />
            <button type="submit" onClick={submitHandler}>
            {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          "POST"
        )}
            </button>
            
            </div>
    )
};

export default Editsuggestion;