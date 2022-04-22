import React, { useEffect, useState } from "react";
import "./Complaints.css";
import samimg from "../../../images/img1.webp";
import Axios from "../../../constant/axios";
import { errorToast, infoToast } from "../../../constant/toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Mcomplaints = () => {
  const [options, setOptions] = useState("All");
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (options === "All") {
      setComplaints([]);
      setLoading(true);
      Axios.get("/complaint/get/All")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            setComplaints(data.complaint);
          } else infoToast(data.message || "something wrong please try again");
        })
        .catch((e) => {
          setLoading(false);
          errorToast("Please check your network");
        });
    }
    if (options === "Blocked") {
      setComplaints([]);
      setLoading(true);
      Axios.get("/complaint/getAllBlocked")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            setComplaints(data.complaint);
          } else infoToast(data.message || "something wrong please try again");
        })
        .catch((e) => {
          setLoading(false);
          errorToast("Please check your network");
        });
    }
  }, [options]);
  return (
    <div className="mcom-box-main">
      <div className="mcom-btns">
        <button
          onClick={() => setOptions("All")}
          style={{ background: options === "All" && "#ab72dc" }}
        >
          All
        </button>

        <button
          onClick={() => setOptions("Blocked")}
          style={{ background: options === "Blocked" && "#ab72dc" }}
        >
          Blocked
        </button>
      </div>

      <div className="mcom-content-main">
        {loading && (
          <div className="mcom-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && complaints.length === 0 && (
          <div className="mcom-box">
            <center>No complaints</center>
          </div>
        )}

        {complaints.map((com) => {
          return (
            <div className="mcom-box" key={com._id}>
              <p>{com.message}</p>
              {com.image && (
                <img src={com.image.url} alt="image not supported" />
              )}
              <div className="status-btns">
                <button>Reply</button>
                <button>Solved</button>
                <button>Block request</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mcomplaints;
