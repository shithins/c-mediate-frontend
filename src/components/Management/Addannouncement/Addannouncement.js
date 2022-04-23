import React, { useState } from "react";
import "./Addannouncement.css";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import { uploadFile, deleteFile } from "../../../constant/functions";
import Axios from "../../../constant/axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Addannouncement = ({ setManagementpopup }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState({});
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const sumbitHandler = () => {
    if (!title || !message || !dueDate || !file)
      return infoToast("All fields are required");
    if (
      (new Date(dueDate).getTime() - new Date().getTime()) /
        (1000 * 3600 * 24) <
      0
    )
      return infoToast("Select upcomming date");
    setLoading(true);
    uploadFile(file, "Announcements", setProgress)
      .then((r) => {
        Axios.post("/announcement/add", {
          message,
          dueDate,
          title,
          pdf: { id: r.id, url: r.url },
        })
          .then(({ data }) => {
            setLoading(false);
            if (data.status) {
              successToast("Added announcement");
              setManagementpopup("close");
            } else {
              deleteFile(r.id, "Announcements");
              infoToast(data.message || "failed to post ");
            }
          })
          .catch((e) => {
            deleteFile(r.id, "Announcements");
            setLoading(false);
            errorToast(e.message || "network error");
          });
      })
      .catch((e) => {
        setLoading(false);
        errorToast("something wrong please try again");
      });
  };
  
  return (
    <div className="add-ann-main">
      <div className="man-close" onClick={() => setManagementpopup("close")}>
        <CloseIcon />{" "}
      </div>
      <h2>ADD ANNOUNCEMENTS</h2>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Heading here"
        required
      />
      <input
        type="date"
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Expiry date"
        required
      />
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="application/pdf"
        required
      />
      <button onClick={sumbitHandler}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            {progress < 100 && progress !== 0
              ? `uploading file ${Math.round(progress)}%`
              : "posting announcement"}
            <LinearProgress />
          </Box>
        ) : (
          "POST"
        )}
      </button>
    </div>
  );
};

export default Addannouncement;
