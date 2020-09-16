import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import moment from 'moment'

import auth from '../../lib/auth'

const SingleClassCard = ( { props, id, name, time_of_class, gym, instructor, description, activity_type }) => {

  function handleBooking() {
    const data = {
      name: name,
      gym: gym.name,
      instructor: instructor.name,
      description: description,
      time_of_class: time_of_class,
      activity_type: activity_type,
      data_booked: moment().format('MMM Do')
    }
    axios.post('/api/fitness/bookedclass/', data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => {
        props.history.push('/bookingconfirmation')
      })
  }


  return <>
    <div className="card class-card" key={id}>
      <div className="card-content">
        <div className="elem">
          <h1>{name}</h1>
          <h2>{time_of_class}</h2>
          <p>{instructor.name}</p>
        </div>
      </div>
      <div className="buttons are-small">
        <Link to={{ pathname: `fitness/${id}` }}>
          <button className="button">More Info</button>
        </Link>
        <button onClick={() => handleBooking()} className="button">Book Now</button>
      </div>
    </div>
  </>
}

export default SingleClassCard