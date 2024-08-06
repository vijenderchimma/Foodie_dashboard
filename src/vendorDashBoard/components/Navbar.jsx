import React from 'react'

const Navbar = ({logOutHandler,showLogOut,ShowRegisterHandler,ShowLoginHandler}) => {
  const firmName = localStorage.getItem('firmName')
  return (
    <div className="nav-section">
        <div className="company">
            Vendor DashBoard
        </div>
        <div className="firm-name">
          {firmName &&<h4>FirmName : {firmName}</h4>}
        </div>
        <div className="user-auth">
          {showLogOut?
          <button onClick={logOutHandler}>LogOut</button>
          :
          <>
          <button onClick={ShowLoginHandler}>Login /</button>
            <button onClick={ShowRegisterHandler}>Register</button>
          </>}
        </div>
    </div>
  )
}

export default Navbar


