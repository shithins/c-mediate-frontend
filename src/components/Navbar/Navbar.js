import React from 'react'
import './Navbar.css'
import avatar from '../../images/avatar.jpeg'


function Navbar() {
  return (
    <div className='nav-main'>
    <p>C-MEDIATE</p>
    <img src={avatar} />
    </div>
  )
}

export default Navbar;