import React, { useEffect, useState } from "react";
import "./Ucomplaints.css";
import samimg from "../../../images/img1.webp";
import ReportIcon from "@mui/icons-material/ReportGmailerrorred";
import { errorToast, infoToast, successToast } from "../../../constant/toast";
import Axios from "../../../constant/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2'
import { deleteFile } from "../../../constant/functions";

const Ucomplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState("All");
  useEffect(() => {
    setLoading(true);
    if (options === "All") {
      Axios.get("/complaint/get/All")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            setComplaints(data.complaint);
          } else infoToast(data.message || "something wrong");
        })
        .catch((e) => {
          setLoading(false);
          errorToast("something wrong");
        });
    } else {
      Axios.get("/complaint/get/Own")
        .then(({ data }) => {
          setLoading(false);
          if (data.status) {
            if (options === "Solved") {
              setComplaints(
                data.complaint.filter((i) => i.status === "solved")
              );
            } else if (options === "Blocked")
              setComplaints(
                data.complaint.filter((i) => i.status === "blocked")
              );
            else setComplaints(data.complaint);
          } else infoToast(data.message || "something wrong");
        })
        .catch((e) => {
          setLoading(false);
          errorToast("something wrong");
        });
    }
  }, [options]);

  const reportComplaint=_id=>{
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:'#3085d6' ,
      confirmButtonText: 'Report !'
    }).then((result) => {
      if (result.isConfirmed) {
       Axios.post('/complaint/report',{_id}).then(({data})=>{
         if(data.status){
          Swal.fire('Reported!', '', 'success')
          setComplaints(complaints.filter(i=> i._id !== _id))
         }else{
          Swal.fire('Failed!', data.message || 'something wrong', 'error')
         }
       }).catch(e=> Swal.fire('Failed !','something wrong','error'))
      }
    })
  }

  const deleteHandler=(_id,image)=>{
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:'#3085d6' ,
      confirmButtonText: 'Delete !'
    }).then((result) => {
      if(result.isConfirmed){
        Axios.post('/complaint/delete',{_id}).then(({data})=>{
          if(data.status){
            if(image){
              deleteFile(image.id,"complaints")
            }
            successToast("Deleted")
            setComplaints(complaints.filter(i=> i._id !== _id))
          }else Swal.fire('Failed!', data.message || 'something wrong', 'error')
        }).catch(e=> Swal.fire('Failed !','something wrong','error'))
      }
    })
  }

  return (
    <div className="ucom-box-main">
      <div className="ucom-btns">
        <button
          onClick={() => setOptions("All")}
          style={{ background: options === "All" && "#ab72dc" }}
        >
          All
        </button>
        <button
          onClick={() => setOptions("Mycom")}
          style={{ background: options === "Mycom" && "#ab72dc" }}
        >
          My Complaints
        </button>
        <button
          onClick={() => setOptions("Solved")}
          style={{ background: options === "Solved" && "#ab72dc" }}
        >
          Solved
        </button>
        <button
          onClick={() => setOptions("Blocked")}
          style={{ background: options === "Blocked" && "#ab72dc" }}
        >
          Blocked
        </button>
      </div>
      <div className="ucom-content-main">
        {loading && (
          <div className="com-box">
            <center>
              <Box>
                <CircularProgress />
              </Box>
            </center>
          </div>
        )}
        {!loading && complaints.length === 0 && (
          <div className="com-box">
            <center>No complaints</center>
          </div>
        )}
        {complaints.length !== 0 &&
          !loading &&
          complaints.map((item) => {
            return (
              <div className="com-box" key={item._id}>
                <p>{item.message}</p>
                {
                  options ==='All' ?
                <div className="report-btn" onClick={()=>reportComplaint(item._id)}>
                  <ReportIcon />
                </div>
                :
                <div className="report-btn"  style={{    display: 'flex' ,marginLeft: '472px'}}>
                  <EditIcon onClick={()=> alert('koii')} />
                
                  <DeleteForeverIcon onClick={()=> deleteHandler(item._id,item.image ?item.image:null)}/>
                </div>
                }
                {
                  item.image && <img src={item.image.url} alt="image not supported"/>
                }
                {
                  options !== 'All' && item.reply &&
                <div className="reply-area">
                  <h6>Reply</h6>
                  <p>
                    {item.reply}
                  </p>
                </div>
                }
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Ucomplaints;
