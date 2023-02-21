import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  function Signout() { 
    localStorage.removeItem('token')
    navigate('/login')
}

  return (
    <>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
    </li>
    
  </ul>
  <ul className="navbar-nav ml-auto"> 

    {/* <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="#" role="button">
        <i className="fas fa-bell" />
      </a>
    </li> */}
    <li className="nav-item">
      <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" onClick={Signout}  role="button">
        <i className="fas fa-sign-out-alt" />
      </a>
    </li>
  </ul>
</nav>

    </>
  )
}
