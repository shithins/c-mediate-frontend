import React, {  useState } from "react";
import "./App.css";
import Loginpage from "./components/Loginpage/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Userhome from "./components/User/Userhome/Userhome";
import Managehome from "./components/Management/Home/Mhome";
import Navbar from "./components/Navbar/Navbar";
import Forgotpassword from "./components/ForgotPassword/Forgotpassword";
import { ToastContainer } from "react-toastify";
import Adminpage from "./components/Admin/Admin";
import Errorpage from "./components/404 error page/Errorpage";


function App() {
 
  const [showAddpopup , setAddpopup] = useState("close")
  const [showManagementpopup, setManagementpopup] = useState ('close')
  

  return (
    
    <div className="app-class">
      <div className="eclipse1">
        <div className="eclipse2"></div>
      </div>
     
      
    
      <Navbar setAddpopup={setAddpopup} setManagementpopup={setManagementpopup}/>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Loginpage />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/user/home">
            <Userhome setAddpopup={setAddpopup} showAddpopup={showAddpopup}/>
          </Route>
         <Route path="/management/home">
            <Managehome setManagementpopup={setManagementpopup} showManagementpopup={showManagementpopup}/>
         </Route>
         
         <Route path="/forgotpassword">
         <Forgotpassword />
         </Route>
         <Route path="/admin/home">
         <Adminpage/>
         </Route>
         <Route path="/*">
         <Errorpage/>
         </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
