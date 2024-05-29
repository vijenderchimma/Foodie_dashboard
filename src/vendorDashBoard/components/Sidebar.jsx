import React from 'react'

const Sidebar = ({showFirmSection,showAllProductsHandler,showFirmHandler,showAddProductHandler}) => {
  return (
    <div className="sidebar-section">
        <ul>
            {showFirmSection ? <li onClick={showFirmHandler}>Add Firm</li>: ""}
            <li onClick={showAddProductHandler}>Add Product</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default Sidebar