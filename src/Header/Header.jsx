import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='Header-container'>
      <div className='container-logo'>
        <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Wikimedia_Commons_logo_white.png/1200px-Wikimedia_Commons_logo_white.png' />
      </div>
      <div className='nav-menu'>
        <ul className='nav'>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>

        </ul>
      </div>
    </div>
  )
}

export default Header