import React, { useEffect, useState } from "react";
import "./Navbar.css";
import avatar from "../../images/avatar1.jpg"; 
import { useHistory } from "react-router-dom";
import decode from "jwt-decode";
import Logo from '../../images/smallLogo.png'

function Navbar({ setAddpopup , setManagementpopup }) {
  const history = useHistory();
  const [showProopt, setProopt] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const logOut = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = user ? user.token : null;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("user");

        history.push("/");
      }

      if (user.user.role === 1) {
        if (window.location.pathname.split("/")[1] !== "admin") {
          window.location.href = "/admin/home";
        }
      } else if (user.user.role === 2) {
        if (window.location.pathname.split("/")[1] !== "management") {
          window.location.href = "/management/home";
        }
      } else if (user.user.role === 3) {
        if (
          window.location.pathname.split("/")[1] === "admin" ||
          window.location.pathname.split("/")[1] === "management"
        ) {
          window.location.href = "/";
        }
      }
    }
  }, [window.location]);

  return (
    <div className="nav-main">
      <img className="navLogo" onClick={()=> window.location.href='/'} src={Logo}  /> 
      {user?.user && (
        <img src={avatar} className="avatarImg" onClick={() => setProopt(!showProopt)} />
      )}
      {showProopt && (
        <div className="pro-menu" onMouseLeave={() => setProopt(false)}>
          {user?.user?.role === 3 && (
            <>
              <p onClick={() => setAddpopup("complaint")}>Add Complaint</p>
              <p onClick={() => setAddpopup("suggestion")}>Add Suggestion</p>
            </>
          )}

          {user?.user?.role === 2 && (
            <>
              <p onClick={() => setManagementpopup("student")}>Add User</p>
              <p onClick={() => setManagementpopup("announcement")}>Add Announcement</p>
              <p onClick={() => setManagementpopup("profile")}>Edit profile</p>
              <p onClick={() => setManagementpopup("blocked")}>Users</p>
            </>
          )}
          <p onClick={logOut}>Logout</p>
        </div>
      )}
    </div>
  );
}

export default Navbar;
