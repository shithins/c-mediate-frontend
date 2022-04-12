import React , { useState } from 'react'
import './Navbar.css'
import avatar from '../../images/avatar.jpeg'


function Navbar({setAddpopup}) {
  const [showProopt, setProopt] = useState(false)
  return (
    <div className='nav-main'>
    <p>C-MEDIATE</p>
    <img src={avatar} onClick={() => setProopt (!showProopt)}/>
    {showProopt && 
    
      <div className="pro-menu">
      <p onClick={() => setAddpopup('complaint') }>Add Complaint</p>
      <p onClick={() => setAddpopup('suggestion') }>Add Suggestion</p>
      <p>Logout</p>
      </div>
    }
    </div>
  )
}

export default Navbar;