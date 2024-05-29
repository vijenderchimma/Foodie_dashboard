import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
        <div className='page-notfound'>
            <Link to = "/" className='go-back'><p>Go Back</p></Link>
            <h1>404</h1>
            <p>Page Not Found</p>
            <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"/>
        </div>
    </>
  )
}

export default NotFound