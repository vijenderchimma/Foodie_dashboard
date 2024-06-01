import axios from 'axios'
import React,{useState,useEffect} from 'react'
import API_URL from '../helpers/ApiPath'


const AllProducts = () => {
    const [productData,setProducts] = useState([])

    const ProductHandler = async () =>{
        const firmId = localStorage.getItem('firmId')
        console.log(firmId)
        try {
            const response = await axios.get(`${API_URL}/products/get-products/${firmId}`)
            setProducts(response.data)
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    // when we write useffect we have to give callback function in parenthesis
    useEffect(()=>{
        ProductHandler()
        console.log("this is useEffect")
    },[])
    // when we give empty dependency array to useEffect it will execue only once and if we give any value it will execute when that value changes

    const deleteProductById = async (productId) =>{
        try {
            const deleteResponse = await axios.delete(`${API_URL}/products/delete/${productId}`)
            setProducts(productData.products.filter(product=> product._id !== productId))
            confirm("Are you sure, you want to delete")
            alert("Product deleted Successfully")
            window.location.reload()
        } catch (error) {
            console.log(error)
            alert("Failed to delte product")
        }
    }


  return (
    <div>
        {productData.length === 0 ? <p>No products Added</p> :
        (
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Offer</th>
                        <th>Image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{productData.products.map((item)=>{
                    return (
                    <>
                    <tr key = {item._id}>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.offer}</td>
                        <td>{item.image && (<img src = {`${API_URL}/uploads/${item.image}`}
                        alt = {item.productName} className='product-image'/>)}</td>
                        <td><button onClick={()=>deleteProductById(item._id)}>Delete</button></td>
                    </tr>
                    </>
                    )
                })}</tbody>
            </table>
        )}
    </div>
  )
}

export default AllProducts
