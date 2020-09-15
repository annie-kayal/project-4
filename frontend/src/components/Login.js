import React, { useState } from 'react'
import axios from 'axios'
import auth from '../../lib/auth'
import { Link } from 'react-router-dom'

const Login = (props) => {
  const [LoginData, setLoginData] = useState({})
  const [error, setErrror] = useState({ message: '' })

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...LoginData, [name]: value }
    setLoginData(data)
  }


  function handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/login', LoginData)
      .then(resp => {
        auth.setToken(resp.data.token)
        props.history.push('/profile')
      })
      .catch(err => {
        setErrror(err.response.data)
      })
  }

  return <section className="modal is-active">
    <img id='background-image'/>
    <div className="modal-background"></div>
    <div className="modal-content login-content">
      <button onClick={() => props.history.goBack()} className="button is-small close">X</button>
      <img src='https://i.imgur.com/50EzKYk.png' />
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="control has-icons-left has-icons-right">
          <input
            onChange={handleChange}
            type="text"
            name="email"
            className="input is-rounded"
            placeholder="Email"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope"></i>
          </span>
          {error.message === 'Not Registered' ? <p>{error.message}
          </p> : null}
        </div>
        <div className="control has-icons-left has-icons-right">
          <input
            onChange={handleChange}
            type="password"
            name="password"
            className="input is-rounded"
            placeholder="Password"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
          {error.message ? <p>{error.message}
          </p> : null}
        </div>
        <button className="button">
          Login
      </button>
      </form>
      {error.message === 'Not Registered' ?
        <div className="notRegistered">
          <p>Looks like you're not registered with us.</p>
          <Link to='/register'>Register Here</Link>
        </div>
        :

        null}
    </div>
  </section>


}


export default Login 