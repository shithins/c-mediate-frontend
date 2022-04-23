import React, { useState } from "react";
import "./Editprofile.css";
import CloseIcon from "@mui/icons-material/Close";
import { infoToast ,successToast,errorToast} from "../../../constant/toast";
import Axios from '../../../constant/axios'
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const Editprofile = ({ setManagementpopup }) => {
  let user = JSON.parse(localStorage.getItem("user"))
  const [name, setName] = useState(
    JSON.parse(localStorage.getItem("user"))?.user?.name
  );
  const [mobile, setMobile] = useState(
    JSON.parse(localStorage.getItem("user"))?.user?.mobile
  );
  const [loading,setLoading]=useState(false)

const saveHandler=()=>{
    if(!name||!mobile) return infoToast('Missing data')
    setLoading(true)
Axios.post('/user/managementEdit',{_id:user?.user?._id,name,mobile}).then(({data})=>{
    setLoading(false)
    if(data.status){
        setManagementpopup('close')
        successToast('Profile updated')
        user['user']["name"]=name;
        user['user']['mobile']=mobile;
        localStorage.setItem("user", JSON.stringify(user))
    }else infoToast(data.message||'failed to update')
}).catch(e=>{
    setLoading(false)
    errorToast(e.message||'network error')
})

}
  return (
    <div className="editProfile-main">
      <div
        className="man-profile-close"
        onClick={() => setManagementpopup("close")}
      >
        <CloseIcon />{" "}
      </div>
      <h2>Edit Profile </h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Phone number"
      />
      <button onClick={saveHandler}>{loading ? (
          <Box sx={{ width: "100%" }}>
            Saving
            <LinearProgress />
          </Box>
        ) : (
          "Save"
        )}</button>
    </div>
  );
};

export default Editprofile;
