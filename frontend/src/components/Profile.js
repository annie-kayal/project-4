import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'


import NavBar from './NavBar'

import auth from '../../lib/auth'
import axios from 'axios'

const Profile = () => {
  const [profile, setProfile] = useState({ fitness: [] })
  const card = useRef()

  useEffect(() => {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        setProfile(resp.data)
        console.log(resp.data)
      })
  }, [])


  function deleteFitnessClass(e) {
    const id = card.current.id
    axios.delete(`api/fitness/bookedclass/${id}`, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => {
        axios.get('api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
          .then(resp => {
            setProfile(resp.data)
          })
      })
  }

  function showDetails() {
    const innerHTML = event.target.innerHTML
    const lastChar = innerHTML[innerHTML.length - 1]
    if (lastChar === '+') {
      event.target.nextSibling.style.display = 'block'
      event.target.parentNode.style.height = 'auto'
      card.current.style.height = 'auto'
      event.target.innerHTML = 'Details -'
    } else {
      event.target.nextSibling.style.display = 'none'
      event.target.parentNode.style.height = 'auto'
      card.current.style.height = 'auto'
      event.target.innerHTML = 'Details +'
    }


  }

  const { username, image, fitness } = profile
  const name = username
  console.log(name)

  return (
    <section className="section profile-section">
      <div className="container">
        <div className="profile-header">
          <h3 className="profile-name">Welcome back {username}!</h3>
          <img src={image === null ? 'https://static.thenounproject.com/png/629576-200.png' : `http://localhost:8000${profile.image}`} />
        </div>
        {fitness.length === 0 ? null : <h2>Booked Classes</h2>}
        <div className="booked-classes">
          {fitness.length === 0 ?

            <div className='noClassesBooked'>
              <p> No classes booked for today </p>
            </div>

            :

            profile.fitness.map(bookedclass => {
              return <div ref={card} className='card' id={bookedclass.id} key={bookedclass.id}>
                <div className="booked">
                  <p>BOOKED</p>
                </div>
                <div className="card-content">
                  <p>{bookedclass.time_of_class}</p>
                  <h3>{bookedclass.name}</h3>
                  <div className="class-details">
                    <p onClick={showDetails}>Details +</p>
                    <p className='class-description'>{bookedclass.description}</p>
                  </div>
                  <aside className='button-container'>
                    <button onClick={(e) => deleteFitnessClass(e)} className="button">CANCEL</button>
                  </aside>
                </div>
              </div>
            })}
          <Link to='/borough'><button className="button">Find Classes</button></Link>
        </div>
      </div>
      <NavBar />
    </section>
  )
}

export default Profile