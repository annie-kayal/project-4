import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


import auth from '../../lib/auth'

const Register = (props) => {
  const [registerData, setRegisterData] = useState({ image: '' })
  const [errors, setErrors] = useState({})
  const body = new FormData()
  const modalBackground = useRef()
  const modalContent = useRef()

  function handleChange(event) {
    const { name, value } = event.target
    const data = { ...registerData, [name]: value }
    setRegisterData(data)
  }



  function handleSubmit(event) {
    event.preventDefault()
    const imageInput = document.getElementsByClassName('image-field')
    const image = imageInput.image.files
    body.append('email', registerData.email)
    body.append('username', registerData.username ? registerData.username : '')
    body.append('password', registerData.password ? registerData.password : '')
    body.append('password_confirmation', registerData.password_confirmation ? registerData.password_confirmation : '')
    body.append('image', image.length === 0 ? registerData.image : image[0])
    axios.post('/api/register',
      body)
      .then(() => {
        const login = new FormData()
        login.append('email', registerData.email)
        login.append('password', registerData.password)
        axios.post('/api/login', login)
          .then(resp => {
            auth.setToken(resp.data.token)
            props.history.push('/profile')
          })
      })
      .catch(err => {
        setErrors(err.response.data)
      })
  }

  function handleClose() {
    modalBackground.current.style.animation = 'modalDisappear ease-in forwards 0.5s'
    modalContent.current.style.animation = 'modalDisappear ease-in forwards 0.5s'
    props.history.push('/')
  }



  return <section className="modal is-active">
    <img id='background-image' />
    <div ref={modalBackground} className="modal-background"></div>
    <div ref={modalContent} className="modal-content">
      <button onClick={() => handleClose()} className='close button is-small'>X</button>
      <img src='https://i.imgur.com/50EzKYk.png' />
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
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
          {errors.email ? <p>{errors.email[0]}
          </p> : null}
        </div>
        <div className="control has-icons-left has-icons-right">
          <input
            onChange={handleChange}
            type="text"
            name="username"
            className="input is-rounded"
            placeholder="Username"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user"></i>
          </span>
          {errors.username ? <p>{errors.username[0]}
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
          {errors.password ? <p>{errors.password[0]}
          </p> : null}
        </div>
        <div className="control has-icons-left has-icons-right">
          <input
            onChange={handleChange}
            type="password"
            name="password_confirmation"
            className="input is-rounded"
            placeholder="Confirm Password"

          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock"></i>
          </span>
          {errors.password_confirmation ? <p>{errors.password_confirmation[0]}
          </p> : null}
        </div>
        <div className="image-input">
          <input
            onChange={handleChange}
            type="file"
            name="image"
            className="image-field"
          />
        </div>
        {errors.image ? <p>{errors.image[0]}
        </p> : null}
        <button className='button'>
          Register
          </button>
        {errors.email ? <p>Already have an account? <Link className='login-link' to='/login'>Login</Link></p> : null}
      </form>
    </div>
  </section>


}

export default Register


