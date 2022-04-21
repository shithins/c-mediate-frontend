import React, { useEffect, useState } from "react";
import "./Editcomplaint.css";
import CloseIcon from "@mui/icons-material/Close";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import Axios from "../../../constant/axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Editcomplaint = ({
  setEditPop,
  complaints,
  setComplaints,
  setSelectedComplaint,
  selectedComplaint,
}) => {
  const [message, setMessage] = useState(selectedComplaint.message);
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    if (!message) return infoToast("missing data");
    setLoading(true);
    Axios.post("/complaint/edit", { message, _id: selectedComplaint._id })
      .then(({ data }) => {
        setLoading(false);
        if (data.status) {
          successToast("Complaint edited");
          let newArr = [];
          complaints.map((i) => {
            if (i._id === selectedComplaint._id) {
              i.message = message;
            }
            newArr.push(i);
          });
          setComplaints(newArr);
          setEditPop("close");
        } else infoToast(data.message || "something wrong");
      })
      .catch((e) => {
        setLoading(false);
        errorToast("something wrong");
      });
  };
  useEffect(() => {
    return () => {
      setSelectedComplaint({});
    };
  }, []);
  return (
    <div className="editcom-main">
      <div className="CloseIcon" onClick={() => setEditPop("close")}>
        <CloseIcon />
      </div>
      <h2>Edit complaint</h2>
      <textarea
        name="Edit-box"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" onClick={submitHandler}>
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

export default Editcomplaint;
