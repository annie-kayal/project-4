import React from 'react'
import axios from 'axios'
import BoroughCard from './BoroughCard'
import SearchForm from './SearchForm'
import Navbar from './NavBar'

class Borough extends React.Component {
  constructor() {
    super()
    this.state = {
      boroughs: [],
      filteredBoroughs: [],
      query: ''

    }
  }


  componentDidMount() {
    axios.get('/api/fitness/borough/')
      .then(response => {
        this.setState({
          boroughs: response.data,
          filteredBoroughs: response.data
        })
      })
      .catch(error => console.error(error))
  }

  filterBoroughs(event) {
    const searchQuery = event.target.value
    const filteredBoroughs = this.state.boroughs.filter(borough => {
      const regex = new RegExp(searchQuery, 'i')
      return borough.name.match(regex)
    })
    this.setState({
      query: searchQuery,
      filteredBoroughs: filteredBoroughs
    })
  }


  render() {
    return <>
      <Navbar />
      <section className="section borough-section">
        <h1 className="title borough-title">Select Borough</h1>
        <SearchForm query={this.state.query} onChange={() => this.filterBoroughs(event)} />
        <div className="columns is-mobile is-multiline">
          {this.state.filteredBoroughs.map((borough) => {
            return <BoroughCard className='column is-one-quarter-desktop is-one-third-tablet is-half-mobile' props={this.props} id={borough.id} key={borough.id} {...borough} />
          }
          )}
        </div>
      </section>
    </>
  }
}

export default Borough