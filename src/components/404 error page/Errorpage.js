import React, { useEffect, useState } from "react";
import "./Errorpage.css";
import Errimg from "../../images/error.webp";

const Errorpage = () => {
    const [count,setCount]=useState(4)
    const timming=()=>{
        setInterval(()=>{
            if(count ===0){
                 window.location.href='/'
            }else setCount(count-1)
        },1500)
    }
    useEffect(()=>{
        timming()
    },[count])
    return(
        <div className="errorMain">
        <img src={Errimg} />
       
       
        </div>
    )
}

export default Errorpage;