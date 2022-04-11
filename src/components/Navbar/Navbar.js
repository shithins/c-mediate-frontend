import React , { useState } from 'react'
import './Navbar.css'
import avatar from '../../images/avatar.jpeg'


function Navbar() {
  const [showProopt, setProopt] = useState(false)
  return (
    <div className='nav-main'>
    <p>C-MEDIATE</p>
    <img src={avatar} onClick={() => setProopt (true)}/>
    <div className="pro-menu">
    {showProopt === <p>Add Complaint</p>}
    {showProopt === <p>Add Suggestion</p>}
    {showProopt === <p>Logout</p>}
    </div>
    </div>
  )
}

export default Navbar;