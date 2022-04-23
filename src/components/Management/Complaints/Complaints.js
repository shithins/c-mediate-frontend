import React, { useEffect, useState } from "react";
import "./Complaints.css";

import Axios from "../../../constant/axios";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

const Mcomplaints = () => {
  const [options, setOptions] = useState("All");
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (options === "All") {
      setComplaints([]);
      setLoading(true);
      Axios.get("/complaint/getAllComplaints")
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

  const replyHandler = (_id, status) => {
    if (status) return infoToast("Already replied");
    Swal.fire({
      title: "Reply ",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "reply",
      showLoaderOnConfirm: true,
      preConfirm: (reply) => {
        return Axios.post("/complaint/reply", { _id, reply })
          .then(({ data }) => {
            if (data.status) {
              let newArr = [];
              complaints.map((i) => {
                if (i._id === _id) {
                  i["reply"] = reply;
                }
                newArr.push(i);
              });
              setComplaints(newArr);
              successToast("Reply posted");
            } else infoToast(data.message || "failed to post reply");
          })
          .catch((e) => errorToast(e.message||"something went wrong.."));
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const solveHandler = (_id, status) => {
    if (status) return infoToast("Already solved");
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Solve",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("/complaint/solve", { _id })
          .then(({ data }) => {
            if (data.status) {
              let newArr = [];
              complaints.map((i) => {
                if (i._id === _id) {
                  i["status"] = "solved";
                }
                newArr.push(i);
              });
              setComplaints(newArr);
              successToast("Complaint Solved");
            } else infoToast(data.message || "something wrong");
          })
          .catch((e) => errorToast(e.message||"Please check your network"));
      }
    });
  };

  const blockHandler = (_id) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send request",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post("/complaint/block-req", { _id })
          .then(({ data }) => {
            if (data.status) {
              setComplaints(complaints.filter((i) => i._id !== _id));
              successToast("Block requested");
            } else infoToast(data.message || "failed to request");
          })
          .catch((e) => errorToast(e.message||"Please check your internet"));
      }
    });
  };
  const unBlockHandler =_id =>{
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Unblock",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.post('/complaint/unblock',{_id}).then(({data})=>{
          if(data.status){
            setComplaints(complaints.filter((i) => i._id !== _id));
            successToast('Unblocked')
          }else infoToast(data.message||'failed to unblock')
        }).catch(e=> errorToast(e.message||'Please check your internet'))
      }
    })
  }
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

        {!loading &&
          complaints.length !== 0 &&
          complaints.map((com) => {
            return (
              <div className="mcom-box" key={com._id}>
                <p>{com.message}</p>
                {com.image && (
                  <img src={com.image.url} alt="image not supported" />
                )}
                {com.reply && (
                  <div className="replyView-area">
                    <h4>{com.reply}</h4>
                  </div>
                )}
                <div className="status-btns">
                  {options === "All" && (
                    <>
                      <button
                        onClick={() =>
                          replyHandler(com._id, com.reply ? true : false)
                        }
                      >
                        {com.reply ? "Replied" : "Reply"}
                      </button>
                      <button
                        onClick={() =>
                          solveHandler(
                            com._id,
                            com.status === "solved" ? true : false
                          )
                        }
                      >
                        {com.status === "solved" ? "Solved" : "Solve"}
                      </button>
                      <button onClick={() => blockHandler(com._id)}>
                        Block request
                      </button>
                    </>
                  )}
                  {options === "Blocked" && (
                    <button onClick={() => unBlockHandler(com._id)}>
                      Unblock
                    </button>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Mcomplaints;
