import React, { useState } from "react";
import "./EditStudent.css";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import Axios from "../../../constant/axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const EditStudent = ({ setManagementpopup, editUser }) => {
  const [name, setName] = useState(editUser?.name);
  const [mobile, setMobile] = useState(editUser?.mobile);
  const [loading, setLoading] = useState(false);

  const editHandler = () => {
    if (!name || !mobile) return infoToast("Missing data");
    setLoading(true);
    Axios.post("/user/edit", { _id: editUser?._id, name, mobile })
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          successToast("Student edited");
          setMobile("");
          setName("");
          setManagementpopup('close')
        } else infoToast(data.message || "Failed edit ");
      })
      .catch((e) => {
        setLoading(false);
        errorToast(e.message || "network error");
      });
  };
  return (
    <div className="edit-student-main">
      <div
        className="man-estudent-close"
        onClick={() => setManagementpopup("close")}
      >
        <CloseIcon />{" "}
      </div>
      <h2>Edit User </h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Student Name"
      />
      <input
        type="number"
        value={mobile}
        placeholder="Phone Number"
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={editHandler}>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            Editing
            <LinearProgress />
          </Box>
        ) : (
          "Edit User"
        )}
      </button>
    </div>
  );
};

export default EditStudent;
