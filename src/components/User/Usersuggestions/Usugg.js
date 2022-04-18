import React, { useEffect, useState } from "react";
import { infoToast } from "../../../constant/toast";
import "./Usugg.css";
import Axios from "../../../constant/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const Usuggestions = () => {
  const [suggestion, setSuggestion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState("All");
  useEffect(() => {
    setLoading(true);
    Axios.get("/suggestion/get/" + options)
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setSuggestion(data.suggestions);
        } else infoToast(data.message || "something wrong please reload");
      })
      .catch((e) => {
        setLoading(false);
        infoToast("something wrong please reload");
      });
  }, [options]);

  return (
    <div className="usugg-box-main">
      <div className="usugg-btns">
        <button
          onClick={() => setOptions("All")}
          style={{ background: options === "All" && "#ab72dc" }}
        >
          All
        </button>
        <button
          onClick={() => setOptions("own")}
          style={{ background: options === "own" && "#ab72dc" }}
        >
          My Suggestions
        </button>
      </div>
      <div className="usugg-content-main">
        {loading && (
          <div className="sugg-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && suggestion.length === 0 && (
          <div className="sugg-box">
            <center>No suggestions</center>
          </div>
        )}
        {!loading &&
          suggestion.length !== 0 &&
          suggestion?.map((item) => {
            return (
              <div className="sugg-box">
                <p>{item.message}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Usuggestions;
