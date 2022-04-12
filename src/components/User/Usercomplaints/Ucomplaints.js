import React, { useEffect, useState } from "react";
import "./Ucomplaints.css";
import samimg from "../../../images/img1.webp";
import ReportIcon from "@mui/icons-material/ReportGmailerrorred";
import Axios from "../../../constant/axios";
import { errorToast, infoToast } from "../../../constant/toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Ucomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Axios.get("/complaint/get/All")
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setComplaints(data.complaint);
        } else infoToast(data.message || "something wrong");
      })
      .catch((e) => {
        setLoading(false);
        errorToast("something wrong");
      });
  }, []);

  return (
    <div className="ucom-box-main">
      <div className="ucom-btns">
        <button>All</button>
        <button>My Complaints</button>
        <button>Solved</button>
        <button>Blocked</button>
      </div>
      <div className="ucom-content-main">
        {loading && (
          <div className="com-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && complaints.length === 0 && (
          <div className="com-box">
            <center>No complaints</center>
          </div>
        )}
        {complaints.length !== 0 &&
          complaints.map((item) => {
            return (
              <div className="com-box">
                <p>{item.message}</p>
                <div className="report-btn">
                  <ReportIcon />
                </div>
                <div className="reply-area">
                  <h6>Reply</h6>
                  <p>
                    Vaiskah is gonna get suspension and de-barred immediatly
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Ucomplaints;
