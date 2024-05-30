import React, { useState } from 'react'
import axios from 'axios'
import API_URL from '../../helpers/ApiPath'

const Login = ({showWelcomeHandler}) => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const loginHandler = async (event) =>{
    event.preventDefault()
    try {
      const loginDetails = {email,password}
      const response = await axios.post(`${API_URL}/vendor/login`,loginDetails)
      console.log(response.data)
      const data = response.data
      if(response.status === 200){
        setEmail('')
        setPassword('')
        alert('Login Success')
        localStorage.setItem('token',data.token)
        showWelcomeHandler()
      }
      try {
        const vendorId = response.data.vendorId
        console.log(vendorId)
        const vendorResponse = await axios.get(`${API_URL}/vendor/single-vendor/${vendorId}`)
        const vendorData = vendorResponse.data
        if (vendorResponse.status === 200){
          const vendorFirmId =  vendorData.vendorFirmId
          const vendorFirmName = vendorData.vendor.firm[0].firmName
          console.log(vendorFirmName)
          localStorage.setItem('firmId',vendorFirmId)
          localStorage.setItem('firmName',vendorFirmName)
        }
      } catch (error) {
        console.log(error)
      }
      window.location.reload()
    } catch (error) {
      console.log(error)
      alert("Login Failed")
    }
  }

  return (
    <div className="login-section">
        <form className='auth-form' onSubmit={loginHandler}>
            <h3>Vendor Login</h3>
            <label>Email</label>
            <input type = "email" value = {email} name ='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Email' /><br/>
            <label>Password</label>
            <input type = "password" value = {password} name ='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your Password' /><br/>
            <div className="btn-submit">
                <button type = "submit">Login</button>
            </div>

        </form>
    </div>
  )
}

export default Login