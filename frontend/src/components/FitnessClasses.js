import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'bulma'
import SingleClassCard from './SingleClassCard'
import Navbar from './NavBar'
import moment from 'moment'
import axios from 'axios'

const FitnessClasses = (props) => {
  const [borough, setBorough] = useState({ fitnessclass: [] })
  const [AllfitnessClasses, setAllClasses] = useState([])
  const [filteredClass, setFilteredClass] = useState([])

  useEffect(() => {
    const id = props.match.params.id
    axios.get(`/api/fitness/borough/${id}`)
      .then(resp => {
        setBorough(resp.data)
        const unsortedData = resp.data.fitnessclass
        const sortedData = unsortedData.sort((a, b) => {
          return parseInt(a.time_of_class.split(':').join('')) - parseInt(b.time_of_class.split(':').join(''))
        })
        setAllClasses(sortedData)
        setFilteredClass(sortedData)
      })
  }, [])

  function filterClasses(e) {
    const chosenClass = e.target.value
    if (e.target.value === 'All') {
      setFilteredClass(AllfitnessClasses)
    } else {
      const filteredClasses = AllfitnessClasses.filter(classes => {
        return classes.activity_type === chosenClass
      })
      setFilteredClass(filteredClasses)
    }
  }



  function previousPage() {
    props.history.goBack()
  }

  return <>
    <Navbar />
    <section className="section classes-section">
      <div className="header">
        <button onClick={() => previousPage()}>
          Back To Boroughs
        </button>
      </div>
      <div id='buffer'></div>
      <div className="container">
        <div className="title">
          <div className="subtitle">
            <h2>{borough.name}</h2>
            <h2>{moment().format('MMMM Do')}</h2>
          </div>
          <div className="select">
            <select onChange={(e) => filterClasses(e)}>
              <option value="All">All</option>
              <option value="Yoga">Yoga</option>
              <option value="HIIT">HIIT</option>
              <option value="Barre">Barre</option>
              <option value="Dance">Dance</option>
              <option value="Pilates">Pilates</option>
              <option value="Boxing">Boxing</option>
              <option value="Cycling">Cycling</option>
            </select>
          </div>
        </div>
        <div className='classes-container'>
          {filteredClass.map(elem => {
            return <SingleClassCard className='card class-card' props={props} key={elem.id} {...elem} />
          })}
        </div>
        <div id="buffer"></div>
      </div>
    </section>
  </>
}

export default FitnessClasses