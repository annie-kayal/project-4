import React from 'react'
import '../../src/style.scss'
import { Link } from 'react-router-dom'


const Home = () => {


  return (
    <section className="hero is-light is-fullheight homepage">
      <img id='background-image' />
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="title">
            <h1>FITBOOK</h1>
            <img src='https://i.imgur.com/50EzKYk.png' />
          </div>
          <div className="description">
            <p>Search, Find &  Book classes <br /> for the next day</p>
            <div className="subtitle">
              <Link to='/register'><button className="button">Register</button></Link>
              <Link to='/login'><button className="button">Login</button></Link>
            </div>
          </div>
        </div>
      </div>
      <div className='description-desktop'>
        <h1>FITBOOK</h1>
        <p>Search, Find &  Book classes for the next day</p>
      </div>
    </section>
  )
}

export default Home