import React, { useEffect, useState } from "react";
import { infoToast } from "../../../constant/toast";
import "./Uannouncements.css";
import Axios from "../../../constant/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Uannouncements = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    Axios.get("/announcement/get")
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setAnnouncement(data.announcement);
        } else infoToast(data.message || "something wrong please reload");
      })
      .catch((e) => {
        setLoading(false);
        infoToast("something wrong please reload");
      });
  }, []);

  return (
    <div className="uann-box-main">
      <div className="uann-content-main">
        {loading && (
          <div className="ann-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && announcement.length === 0 && (
          <div className="ann-box">
            <center>No announcement</center>
          </div>
        )}
        {!loading &&
          announcement !== 0 &&
          announcement.map((item) => {
            return (
              <div className="ann-box">
                <h2>{item.title}</h2>
                <h4>{new Date(item.dueDate).toLocaleDateString()}</h4>
                <p>{item.message}</p>
                {item.pdf && (
                  <button
                    onClick={() => (window.location.href = `${item.pdf.url}`)}
                  >
                    Get Details
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Uannouncements;
