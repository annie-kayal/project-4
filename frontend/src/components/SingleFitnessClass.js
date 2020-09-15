import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

import auth from '../../lib/auth'

import NavBar from './NavBar'

const SingleFitnessClass = (props) => {
  const [fitnessclass, setFitnessclass] = useState([])

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/fitness/${id}`)
      .then(resp => {
        console.log(resp.data)
        setFitnessclass(resp.data)
      })
  }, [])

  function handleBooking(e) {
    const data = {
      name: fitnessclass.name,
      gym: gymname,
      instructor: instructor,
      description: fitnessclass.description,
      time_of_class: fitnessclass.time_of_class,
      activity_type: fitnessclass.activity_type,
      data_booked: moment().format('MMM Do')
    }
    axios.post('/api/fitness/bookedclass/', data, { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(() => {
        props.history.push('/bookingconfirmation')
      })
  }

  function previousPage() {
    props.history.goBack()
  }


  const gymname = fitnessclass.gym ? fitnessclass.gym.name : null
  const gymfacilities = fitnessclass.gym ? fitnessclass.gym.facilities : null
  const instructor = fitnessclass.instructor ? fitnessclass.instructor.name : null
  return (
    <section className="section fitnessclass-section">
      <button onClick={() => previousPage()} >X</button>
      <div className="container">
        <div className="subtitle">
          <div className="title">
            <h2>{fitnessclass.name}</h2>
            <h4 id='class-time'>{fitnessclass.time_of_class}</h4>
          </div>
          <h4>{fitnessclass.activity_type}</h4>
        </div>
        <div className="singlefitness-container">
          <h2> Location :</h2>
          <h5> {gymname}</h5>
        </div>
        <div className="singlefitness-container">
          <h2>Gym Facilites :</h2>
          <h5> {gymfacilities}</h5>
        </div>
        <div className="singlefitness-container">
          <h2>Instructor :</h2>
          <h5 className="instructor"> {instructor}</h5>
        </div>
        <p className='card'>{fitnessclass.description}</p>
        <button onClick={(e) => handleBooking(e)} className='button'>Book Now</button>
      </div>
      <NavBar />
    </section>
  )
}

export default SingleFitnessClass