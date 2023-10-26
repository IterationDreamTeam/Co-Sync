import React from 'react';
import { Link } from 'react-router-dom';
import NotifPopover from './NotifPopover.jsx';
import ProfilePopover from './ProfilePopover.jsx';
/*
  This component is the navbar. It contains the links to the home, profile, settings, and logout pages.
  And should exist everywhere except the login and signup pages.
*/

const NavBar = () => {
  
  return (
    <nav className='NavBar'>
      <h1><a href='https://github.com/Co-Sync/Co-Sync'>Co-Sync</a></h1>
      <ul>
        <li>
          <Link className='routerLink' to='/'>Home</Link>
        </li>
      </ul>
      <ul>
        <li>
          <NotifPopover  />
          <ProfilePopover  />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;
