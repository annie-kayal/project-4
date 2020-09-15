import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'
import { withRouter } from 'react-router-dom'

const NavBar = (props) => {


  function HandleLogout() {
    auth.logOut()
    props.history.push('/')
  }


  return <nav className="navbar is-fixed-bottom">
    <div className="navbar-item">
      <Link to="/borough">Explore</Link>
    </div>
    <div className="navbar-item profile-link">
      <Link to="/profile">
        <img src='https://i.imgur.com/50EzKYk.png' />
      </Link>
    </div>
    <div className="navbar-item"
      onClick={() => HandleLogout()}>
      <Link to="/">Log out</Link>
    </div>
  </nav>


}
export default withRouter(NavBar)