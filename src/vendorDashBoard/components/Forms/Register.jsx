import React, { useState } from 'react'
import API_URL from '../../helpers/ApiPath'
import axios from 'axios'

const Register = ({ShowLoginHandler}) => {

  const [username,setuserName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [message,setMessage] = useState('')
  const [loading,setLoading] = useState(true)


  const usernameHandler = e => {
    setuserName(e.target.value)
  }

  const emailHandler = e => {
    setEmail(e.target.value)
  }

  const passwordHandler = e => {
    setPassword(e.target.value)
  }

  const registerhandler = async (event) => {
    event.preventDefault()
    const vendorDetails = {username,email,password}
    try {
      const response = await axios.post(`${API_URL}/vendor/register`,vendorDetails)
      console.log(response.data)
      if(response.status===200){
        setuserName('')
        setEmail('')
        setPassword('')
        console.log(response.data)
        alert("vendor registered successfully")
        ShowLoginHandler()
      }
      
    } catch (error) {
      console.log(error)
      alert("registration failed")
    }
  }


  return (
    <div className="register-section">
        <form className='auth-form' onSubmit={registerhandler}>
        <h3>Vendor Register</h3>
            <label>User name</label>
            <input type = "text" value={username} name='username' onChange = {usernameHandler} placeholder='Enter Your name' /><br/>
            <label>Email</label>
            <input type = "email" value={email} name='email' onChange={emailHandler} placeholder='Enter Your Email' /><br/>
            <label>Password</label>
            <input type = "password" value={password} name='password' onChange={passwordHandler} placeholder='Enter Your Password' /><br/>
            <div className="btn-submit">
                <button type = "submit">Register</button>
            </div>
        </form>
    </div>
  )
}

export default Register
