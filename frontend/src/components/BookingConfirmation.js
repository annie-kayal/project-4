import React, { useState, useEffect } from 'react'
import 'bulma'
import { Link } from 'react-router-dom'
import auth from '../../lib/auth'
import axios from 'axios'


const BookingConfirmation = () => {
  const [user, setUser] = useState({ fitness: [] })
  const [lastClass, setLastClass] = useState({})

  useEffect(() => {
    axios.get('api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(resp => {
        setUser(resp.data)
        setLastClass(resp.data.fitness)
      })
  }, [])

  const lastBooked  = lastClass[lastClass.length - 1]
  const lastBookedname = lastBooked ? lastBooked.name : null 
  const lastBooktime = lastBooked ? lastBooked.time_of_class : null
  const lastBookedgym = lastBooked ? lastBooked.gym : null  

  return <>
    <section className="section confirmation-section">
      <div className="container has-text-centered">
        <div className="title">
          <img src='https://i.imgur.com/50EzKYk.png' />
          <h3>Booking Confirmation</h3>
        </div>
        <div className="subtitle">
          <h2>Hey {user.username}! </h2>
          <p>You've successfully booked  </p>
          <h3>{lastBookedname}</h3>
          <p>Your class will be at </p>
          <h3>{lastBookedgym}</h3>
          <p>at </p> 
          <h3>{lastBooktime}</h3>
          <Link to={'/profile'}><button className="button booking">View Booked Classes</button></Link>
        </div>
      </div>
    </section>
  </>
}

export default BookingConfirmation