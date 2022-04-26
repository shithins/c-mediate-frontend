import React, { useState } from "react";
import "./Forgotpassword.css";
import { errorToast, infoToast, successToast } from "../../constant/toast";
import Axios from "../../constant/axios";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export const Fpassnumber = ({
  setFpasspage,
  setMobile,
  mobile,
  loading,
  setLoading,
}) => {
  const sendOtp = () => {
    if (!mobile) return infoToast("missing data");
    setLoading(true);
    Axios.post("/user/forgot/sendOtp", { mobile })
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setFpasspage("fotp");
        } else infoToast(data.message || "failed to send otp");
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.message || "network error");
      });
  };
  return (
    <div className="fpass-num-main">
      <label htmlFor="text">Forgot Password</label>
      <input
        type="number"
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter your registered mobile number"
      />
      <button type="submit" onClick={sendOtp}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            Getting
            <LinearProgress />
          </Box>
        ) : (
          "Get otp"
        )}
      </button>
    </div>
  );
};

export const Fpassotp = ({
  setFpasspage,
  mobile,
  setLoading,
  loading,
  otp,
  setOtp,
}) => {
  const verifyOtp = () => {
    if (!otp) return infoToast("missing data");
    setLoading(true);
    Axios.post("/user/forgot/checkOtp", { mobile, otp })
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setFpasspage("fpasscreate");
        } else infoToast(data.message || "failed to verify otp");
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.message || "network error");
      });
  };
  return (
    <div className="Fpassotp-main">
      <label>Enter OTP</label>
      <input
        type="number"
        onChange={(e) => setOtp(e.target.value)}
        placeholder="OTP here"
      />
      <button type="submit" onClick={verifyOtp}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            Verifying
            <LinearProgress />
          </Box>
        ) : (
          "Verify"
        )}
      </button>
    </div>
  );
};

export const Fpasscreate = ({ loading, mobile, otp, setLoading }) => {
  const [password, setPassword] = useState("");
  const [pass2, setPass2] = useState("");
  const changeHandler = () => {
    if (password !== pass2 && password.length < 4 && !password)
      return infoToast(
        "check you password ,password must me greater than 4 letters"
      );
    setLoading(true);
    Axios.post("/auth/register/create-password", { mobile, otp, password })
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          successToast("password changed");
          localStorage.setItem("user", JSON.stringify(data?.profile));
          window.location.href = "/login";
        } else infoToast(data.message || "failed to create password");
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.message || "network error");
      });
  };
  return (
    <div className="Fpasscreate-main">
      <h2>Change Password</h2>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password "
      />
      <input
        type="password"
        placeholder="Re-enter new password"
        onChange={(e) => setPass2(e.target.value)}
      />
      <button onClick={changeHandler}>
        {" "}
        {loading ? (
          <Box sx={{ width: "100%" }}>
            Changing
            <LinearProgress />
          </Box>
        ) : (
          "Change"
        )}
      </button>
    </div>
  );
};
