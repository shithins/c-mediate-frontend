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
import Ucomplaints from "./components/User/Usercomplaints/Ucomplaints";
import Usuggestions from "./components/User/Usersuggestions/Usugg";

function App() {
  // const demoUser = {
  //   phone: "7025638802",
  //   password: "user123"
  // }

  // const[user, setUser] =useState({phone:""});

  return (
    <div className="app-class">
      <div className="eclipse1">
        <div className="eclipse2"></div>
      </div>
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
          <Route path="/userhome">
            <Userhome />
          </Route>
          <Route path="/ucom">
            <Ucomplaints />
          </Route>
          <Route path="/usugg">
            <Usuggestions/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
