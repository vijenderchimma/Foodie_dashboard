import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/Forms/Login'
import Register from '../components/Forms/Register'
import AddFirm from '../components/Forms/AddFirm'
import AddProduct from '../components/Forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'

const LandingPage = () => {

  const [ShowLogin,setShowLogin] = useState(false)
  const [ShowRegister,setShowRegister] = useState(false)
  const [showFirm,setShowFirm] = useState(false)
  const [showAddProduct,setShowAddProduct] = useState(false)
  const [showWelcome,setShowWelcome] = useState(false)
  const [showAllProducts,setShowAllProducts] = useState(false)
  const [showLogOut,setShowLogOut] = useState(false)
  const [showFirmSection,setShowFirmsection] = useState(true)

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName')
    if(firmName){
      setShowFirmsection(false)
    }
  },[])

  useEffect(()=>{
    const loginToken = localStorage.getItem('token')
    if(loginToken){
      setShowLogOut(true)
    }
  },[])

  const logOutHandler = () => {
    const confirmed = confirm('Are you sure, you want to logout')
    if(confirmed){
      localStorage.removeItem('firmId')
      localStorage.removeItem('token')
      localStorage.removeItem('firmName')
      setShowLogOut(false)
      window.location.reload()
    }
  }

  const ShowLoginHandler = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowAddProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  } 

  const ShowRegisterHandler = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowAddProduct(false)
    setShowWelcome(false)
    setShowAllProducts(false)
  }

  const showFirmHandler = () =>{
    const token = localStorage.getItem('token')
    if(token){
      setShowFirm(true)
      setShowRegister(false)
      setShowLogin(false)
      setShowAddProduct(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }
    else{
      setShowLogin(true)
      alert("please login")
    }
    
  }

  const showAddProductHandler = () => {
    const token = localStorage.getItem('token')
    if(token){
      setShowAddProduct(true)
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
      setShowWelcome(false)
      setShowAllProducts(false)
    }
    else{
      setShowLogin(true)
      alert("please login")
    }
  }

  const showWelcomeHandler = () => {
    setShowWelcome(true)
    setShowAddProduct(false)
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(false)
    setShowAllProducts(false)
    
  }
  const showAllProductsHandler = () => {
    const token = localStorage.getItem('token')
    if(token){
      setShowAllProducts(true)
      setShowWelcome(false)
      setShowAddProduct(false)
      setShowRegister(false)
      setShowLogin(false)
      setShowFirm(false)
    }
    else{
      setShowLogin(true)
      alert("please login")
    }
  }

  return (
    <>
        <section className='landing-section'>
            <Navbar ShowLoginHandler= {ShowLoginHandler} showLogOut = {showLogOut}
            logOutHandler={logOutHandler} ShowRegisterHandler = {ShowRegisterHandler}/>
            <div className="collection-section">
              <Sidebar showFirmSection={showFirmSection} showAllProductsHandler={showAllProductsHandler} showFirmHandler={showFirmHandler} showAddProductHandler= {showAddProductHandler}/>
              {ShowLogin&& <Login showWelcomeHandler= {showWelcomeHandler}/>}
              {ShowRegister && <Register ShowLoginHandler = {ShowLoginHandler} />}
              {showFirm && <AddFirm />}
              {showAddProduct && <AddProduct /> }
              {showWelcome && <Welcome/>}
              {showAllProducts && <AllProducts/>}
            </div>
        </section>
    </>
  )
}

export default LandingPage