import React, { useState } from "react";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast, successToast } from "../../constant/toast";
import Axios from "../../constant/axios";
import {Redirect,useHistory} from 'react-router-dom';

const Loginpage = () => {
  const [error, setError] = useState("");
  const [details, setDetails] = useState({ mobile: "", password: "" });
  const history=useHistory();
  const submitHandler = () => {
    Axios.post("/auth/login", details).then((res) => {
      console.log(res.data);
      if (res.data.status) successToast();
      else errorToast(res.data.message);
    });
  };

  return (
    <div className="login-main">

      <div className="login-mainbox">
        <h2>LOGIN</h2>

        <div className="login-textbox1">
            
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Mobile Number"
            onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
            value={details.mobile}
          />
        </div>
        <div className="login-textbox2">
            
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <div className="login-btn">
          <button onClick={submitHandler}>LOGIN</button>
        </div>
        <div className="fpass">
            <h4 onClick={ () => history.push("/signup")}>Sign-up</h4>
          <h3>Forgot password ?</h3>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Loginpage;
