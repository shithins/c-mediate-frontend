import React, { useEffect, useState } from "react";
import "./Announcement.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteForever";
import Axios from "../../../constant/axios";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { deleteFile } from "../../../constant/functions";
const Mannouncement = ({setManagementpopup,setEditAnnouncement}) => {
  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/announcement/get/all")
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          setAnnouncement(data.announcement);
        } else infoToast(data.message || "something wrong");
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.message || "network error");
      });
  }, []);

  const deleteHandler = (_id, file) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        successToast("Deleting announcement");
        Axios.post("/announcement/delete", { _id })
          .then(({ data }) => {
            if (data.status) {
              setAnnouncement(announcement.filter((i) => i._id !== _id));
              deleteFile(file.id, "Announcements");
              successToast("deleted");
            } else infoToast(data.message || "failed to delete");
          })
          .catch((e) => errorToast(e.message || "network error"));
      }
    });
  };

  return (
    <div className="mann-box-main">
      <div className="mann-content-main">
        {loading && (
          <div className="mann-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && announcement.length === 0 && (
          <div className="mann-box">
            <center>No announcement</center>
          </div>
        )}
        {announcement.map((ann) => {
          return (
            <div className="mann-box" key={ann._id}>
              <h2>{ann.title}</h2>
              <h4>{new Date(ann.dueDate).toLocaleDateString()}</h4>
              <p>{ann.message}</p>
              <button onClick={() => (window.location.href = `${ann.pdf.url}`)}>
                Get Details
              </button>
              <div className="moptions">
                <button onClick={()=> {
                  setEditAnnouncement(ann)
                  setManagementpopup("editannouncement")}}>
                  <EditIcon />
                  Edit
                </button>
                <button onClick={() => deleteHandler(ann._id, ann.pdf)}>
                  <DeleteIcon />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mannouncement;
