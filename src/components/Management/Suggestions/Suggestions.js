import Axios from "../../../constant/axios";
import React, { useEffect, useState } from "react";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import "./Suggestions.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

const Msuggestion = () => {
  const [options, setOptions] = useState("All");
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setSuggestion([]);
    if (options === "All") {
      Axios.get("/suggestion/getAll")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            setSuggestion(data.suggestion);
          } else infoToast(data.message || "eomthing wrong please try again");
        })
        .catch((e) => {
          setLoading(false);
          errorToast(e.message || "check your network");
        });
    }
    if (options === "Blocked") {
      Axios.get("/suggestion/getAllBlocked")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            setSuggestion(data.suggestion);
          } else infoToast(data.message || "eomthing wrong please try again");
        })
        .catch((e) => {
          setLoading(false);
          errorToast(e.message || "check your network");
        });
    }
  }, [options]);

  const blockhandler = (_id, status) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: status ? "Unblock" : "Block",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("/suggestion/block", { _id, status })
          .then(({ data }) => {
            if (data.status) {
              setSuggestion(suggestion.filter((i) => i._id !== _id));
              successToast(status ? "Unblocked" : "blocked");
            } else infoToast(data.message || "failed ");
          })
          .catch((e) => errorToast(e.message || "please check your internet"));
      }
    });
  };
  return (
    <div className="msugg-box-main">
      <div className="msugg-btns">
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

      <div className="msugg-content-main">
        {loading && (
          <div className="msugg-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && suggestion.length === 0 && (
          <div className="msugg-box">
            <center>No suggestions</center>
          </div>
        )}

        {suggestion.map((sug) => {
          return (
            <div className="msugg-box" key={sug._id}>
              <p>{sug.message}</p>
              {options === "All" && (
                <button onClick={() => blockhandler(sug._id,false)}>Block</button>
              )}
               {options === "Blocked" && (
                <button onClick={() => blockhandler(sug._id,true)}>Unblock</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Msuggestion;
