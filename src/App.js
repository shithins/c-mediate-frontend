import React, { useState } from 'react';

import './App.css';
import Loginpage from './components/Loginpage/Login';
import {BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom"; 
  import Signup from './components/Signup/Signup';
 
function App() {
  // const demoUser = {
  //   phone: "7025638802",
  //   password: "user123"
  // }

  // const[user, setUser] =useState({phone:""});
  

  
  return (
    <div className='app-class'>
      <div className='eclipse1'>
      <div className='eclipse2'>

      </div>
      </div>
      <Router> 

        <Switch>
          <Route path="/">
            <Loginpage /> 
          </Route>
          <Route path="/signup">
            <Signup/>
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
