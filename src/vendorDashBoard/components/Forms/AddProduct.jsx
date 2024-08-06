import React, { useState } from 'react'
import API_URL from '../../helpers/ApiPath'
import axios from 'axios'

const AddProduct = () => {

  const [productName,setProductName] = useState('')
  const [price,setPrice] = useState('')
  const [category,setCategory] = useState([])
  const [bestSeller,setBestSeller] = useState(false)
  const [file,setFile] = useState(null)
  const [description,setDescription] = useState('')

  const categoryHandler = event =>{
    const value = event.target.value

    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value)) // here if category present it will give the another value
    }
    else{
      setCategory([...category,value])// else the value will be store in category
    }
  }

  const handleBestSeller = event => {
    const value = event.target.value === 'true'
    setBestSeller(value)
  }

  const handleImageUpload = event => {
    const selectedImage = event.target.files[0]
    setFile(selectedImage)
  }

  const addProductHandler = async event =>{
    event.preventDefault()
    try {
      const jwtToken = localStorage.getItem('token')
      const firmId = localStorage.getItem('firmId')

      if(!jwtToken || !firmId){
        console.error("user nor authenticated")
      }

      const formData = new FormData();
      formData.append('productName',productName)
      formData.append('price',price)
      formData.append('description',description)
      formData.append('image',file)
      formData.append('bestSeller', bestSeller)

      category.forEach((value)=>{
        formData.append('category',value)
      })

      const response= await axios.post(`${API_URL}/products/add-product/${firmId}`,formData)


      if(response.status === 200){
        console.log(response.data)
        alert('Product Added Successfully')
        setProductName('')
        setCategory([])
        setFile(null)
        setDescription('')
        setPrice('')
        setBestSeller(false)
      }

    } catch (error) {
      console.log(error)
      alert("Failed to add product")
    }
  }

  return (
    <div className="firm-section">
        <form className="table-form" onSubmit={addProductHandler}>
            <h3>Add Product</h3>
            <label>Product Name</label>
            <input type = "text" value={productName} onChange={(e)=>setProductName(e.target.value)}/>
            <label>Price</label>
            <input type = "text" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {/* <label>Category</label>
            <input type = "text" /> */}
            <div className="checkbox-input">
              <label>Category:</label>
              <div className="checkbox-container">
                <label htmlFor='veg'>Veg</label>
                <input type = "checkbox" id = "veg" name = "category" value = "veg" checked={category.includes('veg')} onChange={categoryHandler} />
                <label htmlFor= "nonVeg">Non-Veg</label>
                <input type = "checkbox" id = "nonVeg" name = "category" value = "non-veg" checked={category.includes('non-veg')} onChange={categoryHandler}/>
                </div>
            </div>
            <div className="checkbox-input">
              <label>BestSeller</label>
              <div className="checkbox-container">
                <label htmlFor='Yes'>Yes</label>
                <input type = "radio" id = "Yes" value = "true" checked = {bestSeller === true} onChange={handleBestSeller}/>
                <label htmlFor= "No">No</label>
                <input type = "radio"  id = "No" value = "false" checked = {bestSeller === false} onChange={handleBestSeller}/>
                </div>
            </div>
            {/* <label>BestSeller</label>
            <input type = "text" /> */}
            <label>Description</label>
            <input type = "text" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <label>Image</label>
            <input type = "file" onChange={handleImageUpload} /><br/>
            <div className="btn-submit">
                <button type='submit'>Add Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct

