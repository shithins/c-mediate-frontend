import React, { useEffect, useState } from "react";
import "./Login.css";

import "react-toastify/dist/ReactToastify.css";
import { errorToast, infoToast, successToast } from "../../constant/toast";
import Axios from "../../constant/axios";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Logingif from '../../images/login.gif'
const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({ mobile: "", password: "" });
  const history = useHistory();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user?.user?.role === 3) {
      history.push("/user/home");
    } else if (user?.user?.role === 2) {
      history.push("/management/home");
    } else if (user?.user?.role === 1) {
      history.push("/admin/home");
    }
  }, []);

  const submitHandler = () => {
    if (loading) return;
    if (!details.mobile || !details.password) return errorToast("Missing data");
    setLoading(true);
    Axios.post("/auth/login", details)
      .then((res) => {
        setLoading(false);

        if (res.data.status) {
          if(res?.data?.profile?.user?.role !== 3 && window.screen.width < 600){
            return infoToast('Use computer for better experience ..')
          }
          localStorage.setItem("user", JSON.stringify(res?.data?.profile));
          window.location.reload();
        } else errorToast(res.data.message);
      })
      .catch((e) => {
        setLoading(false);
        errorToast("Invalid login !");
      });
  };

  return (
    <div className="login-main">
      <div className="login-imgbox" >
          <img src={Logingif}/>
        </div>
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
          <button onClick={submitHandler}>
            {loading ? (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <div className="fpass">
          <h4 onClick={() => history.push("/signup")}>Sign-up</h4>
          <h3 onClick={ () => history.push("/forgotpassword")}>Forgot password ?</h3>
        </div>
      </div>

      
    </div>
  );
};

export default Loginpage;
