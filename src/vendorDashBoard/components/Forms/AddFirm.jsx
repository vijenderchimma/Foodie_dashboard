import React, { useState } from 'react'

import API_URL from '../../helpers/ApiPath'

const AddFirm = () => {

  const [firmName,setFirmName] = useState('')
  const [area,setArea] = useState('')
  const [category,setCategory] = useState([])
  const [offer,setOffer] = useState('')
  const [region,setRegion] = useState([])
  const [file,setFile] = useState(null)//ng an empty string '' as the initial value may not be suitable
  // because it implies that a file with an empty string filename has been selected, which is not a valid file selection and can lead to confusion.


  const categoryHandler = event =>{
    const value = event.target.value

    if(category.includes(value)){
      setCategory(category.filter((item)=> item !== value)) // here if category present it will give the another value
    }
    else{
      setCategory([...category,value])// else the value will be store in category
    }
  }

  const regionHandler = event =>{
    const value = event.target.value

    if(region.includes(value)){
      setRegion(region.filter((item)=> item !== value))
    }
    else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload = event => {
    const selectedImage = event.target.files[0]
    setFile(selectedImage)
  }

  const addFirmHandler = async (e) => {
    e.preventDefault()
    try {
      const jwtToken = localStorage.getItem('token')
      if(!jwtToken){
        console.error("User Not Authenticated / token not found")
      }
      console.log(jwtToken)
      const formData = new FormData();
      formData.append('firmName',firmName)
      formData.append('area',area)
      formData.append('offer',offer)
      formData.append('image',file)
      
      category.forEach((value)=>{
        formData.append('category',value)
      })

      region.forEach((value)=>{
        formData.append('region', value)
      })
      const headers = {
        'token': `${jwtToken}`,
      }

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method: 'POST',
        headers:{
          'token': `${jwtToken}`
        },
        body: formData
      })
      const data = await response.json()

      if(response.ok){
        console.log(response.data)
        localStorage.setItem('firmId',data.firmId)
        alert('Firm Added Successfully')
        setArea('')
        setCategory([])
        setRegion([])
        setFile(null)
        setFirmName('')
        setOffer('')
      }else if(data.message === "vendor can have only one firm") {
        
        alert("firm exists. only one firm can be added")
      }
      else{
        alert("firm not added")
      }
      console.log(data.message)
    } catch (error) {
      console.log(error)
      alert("Failed to Add Firm")
    }
  }


  return (
    <div className="product-section">
        <form className="table-form" onSubmit={addFirmHandler}>   
            <h3>Add Firm</h3>
            <label>Firm Name</label>
            <input type = "text" name='firmName' value={firmName} onChange={(e)=> setFirmName(e.target.value)}/>
            <label>Area</label>
            <input type = "text" name = "area" value={area} onChange={(e)=> setArea(e.target.value)}/>
            {/* <label>Category</label>
            <input type = "text" /> */}
            <div className="checkbox-input">
              <label>Category:</label>
              <div className="checkbox-container">
                <label htmlFor='Veg'>Veg</label>
                <input type = "checkbox" id = "Veg" name = "category" checked={category.includes('veg')}
                 value = "veg" onChange={categoryHandler} />
                 {/* check the below comment in region input*/}
                <label htmlFor= "nonVeg">Non-Veg</label>
                <input type = "checkbox" id = "nonVeg" name = "category" checked={category.includes('non-veg')}
                 value = "non-veg" onChange={categoryHandler} />
                 {/* check the below comment in region input*/}
                </div>
            </div>
            {/* <label>Region</label>
            <input type = "text" /> */}
            <label>Offer</label> 
            <input type = "text" name ="offer" value={offer} onChange={(e)=> setOffer(e.target.value)}/>
            <div className="checkbox-input">
              <label>Region:</label>
              <div className="checkbox-container">
                <label htmlFor='southIndian'>South Indian</label>
                <input type = "checkbox" id = "southIndian" name = "Region" value = "south-indian" 
                checked={region.includes("south-indian")} onChange={regionHandler} />

                {/* checked={region.includes("south-indian")} ensures that the checkbox reflects the current state of the region array. 
                If "south-indian" is included in the region array, the checkbox will be checked; otherwise, it will be unchecked. */}
                
                <label htmlFor= "northIndian">North Indian</label>
                <input type = "checkbox" id = "northIndian" name = "Region" value = "north-indian" 
                checked={region.includes("north-indian")} onChange={regionHandler} />
                {/* check the above comment */}
                <label htmlFor='chinese'>Chinese</label>
                <input type = "checkbox" id = "chinese" name = "Region" value = "chinese"
                checked={region.includes("chinese")} onChange={regionHandler} />
                {/* check the above comment */}
                <label htmlFor= "bakery">Bakery</label>
                <input type = "checkbox" id = "bakery" name = "Region" value = "bakery"
                checked={region.includes("bakery")}  onChange={regionHandler}/>
                {/* check the above comment */}
              </div>
            </div>
            <label>Image</label>
            <input type = "file" onChange={handleImageUpload} />
            <div className="btn-submit">
                <button type= "submit">Add Firm</button>
            </div>
        </form>
    </div>
  )
}

export default AddFirm