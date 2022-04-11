import React, { useState } from "react";
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
  

  return (
    
    <div className="app-class">
      <div className="eclipse1">
        <div className="eclipse2"></div>
      </div>
      <Navbar />
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
            <Userhome />
          </Route>
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
