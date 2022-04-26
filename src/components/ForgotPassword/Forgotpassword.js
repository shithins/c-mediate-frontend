import React, { useState } from "react";
import "./Forgotpassword.css";
import { Fpassnumber, Fpassotp, Fpasscreate } from "./Fotgotpasswordsub";
import Logingif from "../../images/login.gif";

const Forgotpassword = () => {
  const [fpasspage, setFpasspage] = useState("fmobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div className="Fpass-main">
      <div className="fpass-imgbox">
        <img src={Logingif} />
      </div>
      <div className="Fpass-box">
        {fpasspage === "fmobile" && (
          <Fpassnumber
            mobile={mobile}
            loading={loading}
            setLoading={setLoading}
            setMobile={setMobile}
            setFpasspage={setFpasspage}
          />
        )}
        {fpasspage === "fotp" && (
          <Fpassotp
            mobile={mobile}
            loading={loading}
            setLoading={setLoading}
            otp={otp}
            setOtp={setOtp}
            setFpasspage={setFpasspage}
          />
        )}
        {fpasspage === "fpasscreate" && (
          <Fpasscreate
            mobile={mobile}
            loading={loading}
            setLoading={setLoading}
            otp={otp}
            setFpasspage={setFpasspage}
          />
        )}
      </div>
    </div>
  );
};

export default Forgotpassword;
