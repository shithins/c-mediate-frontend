import React, { useEffect, useState } from "react";
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

import Navbar from "./components/Navbar/Navbar";
function App() {
 
  const [showAddpopup , setAddpopup] = useState("close")
 
  

  return (
    
    <div className="app-class">
      <div className="eclipse1">
        <div className="eclipse2"></div>
      </div>
     
      <Navbar setAddpopup={setAddpopup}/>
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
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
