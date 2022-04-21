import React, { useEffect, useState } from "react";
import "./Addcomplaint.css";
import CloseIcon from "@mui/icons-material/Close";
// import AddPhotoIcon from '@mui/icons-material/AddPhotoAlternate';
import { uploadFile } from "../../../constant/functions";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import Axios from "../../../constant/axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Addcomplaint = ({ setAddpopup }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    return () => {
      setMessage("");
      setFile("");
    };
  }, []);

  const uploadData = (data) => {
    Axios.post("/complaint/add", data)
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          successToast("complaint posted");
          setAddpopup("close");
        } else infoToast(data.message || "something wrong");
      })
      .catch((e) => {
        setLoading(false);
        errorToast("something wrong");
      });
  };

  const uploadHandler = () => {
    if (message === "") return infoToast("missing data");
    setLoading(true);
    if (file) {
      uploadFile(file, "complaints",setProgress)
        .then((r) => uploadData({ message, image: { id: r.id, url: r.url } }))
        .catch((e) => {
          setLoading(false);
          return errorToast("Failed to post complaint ");
        });
    } else uploadData({ message });
  };
  return (
    <div className="addcom-main">
      <div className="CloseIcon" onClick={() => setAddpopup("close")}>
        <CloseIcon />
      </div>
      <h2>" Tell me , What's your PROBLEM 🤔?? 👇 "</h2>
      <textarea
        name="com-box"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here ..."
      />
      <button type="submit" onClick={uploadHandler}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            {progress < 100 && progress !== 0
              ? `uploading file ${progress}%`
              : "posting complaint"}
            <LinearProgress />
          </Box>
        ) : (
          "POST"
        )}
      </button>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
    </div>
  );
};

export default Addcomplaint;
