import React, { useEffect, useState } from "react";
import { infoToast, successToast } from "../../../constant/toast";
import "./Usugg.css";
import Axios from "../../../constant/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";

const Usuggestions = ({setEditPop,setSelectedSuggestion,suggestion,setSuggestion}) => {
  
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

  const deleteHandler=_id=>{
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor:'#d33',
      cancelButtonColor:'#3085d6' ,
      confirmButtonText: 'Delete !'
    }).then((result) => {
      if(result.isConfirmed){
        Axios.post('/suggestion/delete',{_id}).then(({data})=>{
          if(data.status){
            successToast("Deleted")
            setSuggestion(suggestion.filter(i=> i._id !== _id))
          }else Swal.fire('Failed!', data.message || 'something wrong', 'error')
        }).catch(e=> Swal.fire('Failed !','something wrong','error'))
      }
    })
  }
    


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
              <div
                className="sugg-box"
                style={{ background: !item.status && "#ff000069" }}
              >
                <p>{item.message}</p>
                {options === "own" && (
                  <div className="sugg-actionbtns">
                    {item?.status && (
                      <button className="sEdit" onClick={()=>{
                        setSelectedSuggestion(item)
                        setEditPop('suggestion')
                      }}>
                        <EditIcon />
                      </button>
                    )}
                    <button onClick={()=>deleteHandler(item._id)}>
                      <DeleteForeverIcon />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Usuggestions;
