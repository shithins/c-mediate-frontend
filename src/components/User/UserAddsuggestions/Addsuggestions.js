import React, { useState } from "react";
import "./Addsuggestions.css";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import Axios from "../../../constant/axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Addsuggestions = ({ setAddpopup }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadHandler = () => {
    if (!message) return infoToast("missing data");
    setLoading(true);
    Axios.post("/suggestion/add", { message })
      .then(({ data }) => {
        if (data.status) {
          successToast("Posted your suggestion");
          setAddpopup("close");
        } else infoToast(data.message || "something wrong");
      })
      .catch((e) => {
        setLoading(false);
        errorToast("somthing wrong");
      });
  };

  return (
    <div className="addsugg-main">
      <div className="CloseIcon" onClick={() => setAddpopup("close")}>
        <CloseIcon />
      </div>
      <h2>" Your suggestions "</h2>
      <textarea
        name="sugg-box"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here ..."
      />

      <button type="submit" onClick={uploadHandler}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          "POST"
        )}
      </button>
    </div>
  );
};

export default Addsuggestions;
