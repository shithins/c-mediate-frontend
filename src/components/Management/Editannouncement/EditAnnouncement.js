import React, { useState } from "react";
import "./EditAnnouncement.css";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import { uploadFile, deleteFile } from "../../../constant/functions";
import Axios from "../../../constant/axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const EditAnnouncement = ({ setManagementpopup, editAnnouncement }) => {
  const [title, setTitle] = useState(editAnnouncement?.title);
  const [message, setMessage] = useState(editAnnouncement?.message);
  const [dueDate, setDueDate] = useState(editAnnouncement?.dueDate);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const sumbitHandler = () => {
    if (!title || !message || !dueDate)
      return infoToast("All fields are required");
    if (
      (new Date(dueDate).getTime() - new Date().getTime()) /
        (1000 * 3600 * 24) <
      0
    )
      return infoToast("Select upcomming date");
    setLoading(true);
    if (file) {
      
      uploadFile(file, "Announcements", setProgress)
        .then((r) => {
          Axios.post("/announcement/edit", {
            _id: editAnnouncement?._id,
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
                infoToast('Reload required')
                deleteFile(editAnnouncement?.pdf?.id, "Announcements");
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
    } else {
      Axios.post("/announcement/edit", {
        _id: editAnnouncement?._id,
        message,
        dueDate,
        title,
      })
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            successToast("Added announcement");
            infoToast('Reload required')
            setManagementpopup("close");
          } else {
            infoToast(data.message || "failed to post ");
          }
        })
        .catch((e) => {
          setLoading(false);
          errorToast(e.message || "network error");
        });
    }
  };

  return (
    <div className="add-ann-main">
      <div className="man-close" onClick={() => setManagementpopup("close")}>
        <CloseIcon />{" "}
      </div>
      <h2>EDIT ANNOUNCEMENTS</h2>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Heading here"
        value={title}
        required
      />

      <input
        type="date"
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Expiry date"
        value={dueDate}
        required
      />
      <input
        type="text"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Content"
        value={message}
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

export default EditAnnouncement;
