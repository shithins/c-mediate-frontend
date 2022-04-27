import React, { useEffect, useState } from "react";
import "./Errorpage.css";
import Errimg from "../../images/error.webp";

const Errorpage = () => {
    const [count,setCount]=useState(5)
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
        <div className="time-space">
       <p>
           
            Back to HOME in 00:00:0{count}
           </p>
        </div>
        <button className="goHome" onClick={()=>window.location.href='/'} >HOME PAGE</button>
        </div>
    )
}

export default Errorpage;