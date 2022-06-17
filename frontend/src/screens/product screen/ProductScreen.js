import axios from 'axios'
import React, { useEffect,useContext, useState } from 'react'
import StateContext from '../../context/Context';
import {Button, Rating,
        } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useParams, useNavigate} from 'react-router-dom'


import './ProductScreen.scss'

const ProductScreen = () => {


    // const [product, setProduct] = useState({})
    // useEffect(()=>{
      
    //     const fetchProduct = async() =>{
    //         const {data} = await axios.get(`/restapi/products/${id}`)
    //         setProduct(data)
            
    //     }
    //     fetchProduct()

    // }, [id])

    const [qty, setQty] = useState(1)
    const {id} = useParams()
    const navigate = useNavigate()

    const {productDetails, listProductDetails } = useContext(StateContext)
    const {loading, error, product} = productDetails    

    console.log(product) 

    useEffect(()=> {

        async function fetchProduct(){
            const {data} = await axios.get(`/restapi/products/${id}`)
            // setProduct(data)
        }
        fetchProduct()
        listProductDetails(id)

    },[id])


    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)

    }


  return (
    
    <div className="product-screen">
      <Button  className= "go-back" variant = 'outlined' onClick = {() => navigate('/')}> 
      <ArrowBackIcon className="icon"/>
      Go Back
      </Button>


      {loading?
            <h1>loading...</h1>
            :error ? <h3>{error}</h3>
            :
            <div className="grid-container">
             
              <div className="left">
              <img  className="img" src= {product.image} alt = {product.name}/>
              </div>

              <div className="right">

                <div className="name">{product.name}</div>
                <div className="description">Description:</div>
                <div className="description-text">{product.description}</div>
                <div className="reviews-container">
                  <div className="product-rating">{product.rating}</div>
                  <Rating className = "rating" name="half-rating-read" value={product.rating}  precision={0.5} readOnly />
                  <div className="num-reviews">({product.numReviews} ratings)</div>
                </div>

                <span className="price">
                &#8377;{product.price} 
                </span>

                <span className="status">
                Status:
                <span className="status-value">
                {product.countInStock >0 ? 'In stock' : 'Out of Stock'}
                </span>
                </span>

                <div className="input-select">
                <label className="label">Select Quantity</label>
              
                <select required
                onChange={(e)=>{setQty(e.target.value)}}
                >

                {
                    [...Array(product.countInStock).keys()].map((x) =>(
                        <option value={x+1}>{x+1}</option>                                   
                        ))
                } 
                </select>                 
                </div>

                <Button 
                onClick= {addToCartHandler}
                disabled = {product.countInStock === 0}
                className="btn"
                 variant="contained"
                 >Add to Cart</Button>






              </div>

            </div>
      }


      
    </div>
  )
}

export default ProductScreen