import React, {useEffect, useContext, useState} from 'react'
import StateContext from '../../context/Context'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {Button, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './CartScreen.scss'

const CartScreen = () => {

    const [temp, setTemp] = useState(1)
    const {addToCart, cart, removeFromCart} = useContext(StateContext)
    const cartItems = cart.cartItems
    
    const {id} = useParams()
    const productId = id
    
    const navigate = useNavigate()
    
    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)

    const qty = queryParams.get("qty") ? queryParams.get("qty") : 1
    // const qty = location.search ? Number(location.search.split('=')[1]): 1
    
    // console.log(qty)
    console.log(cartItems)
    
    useEffect(() =>{
        if(productId){
            addToCart(productId,qty)
        }
    },[productId,qty])

    const clickHandler = (e,product) => {
        addToCart(product, Number(e.target.value))
        // setTemp(2)
    }

    const removeFromCartHandler = (id) => {
       removeFromCart(id)
    }

    const checkoutHandler = () => {
        // console.log("this is checkout handler")
        navigate('/login?redirect=shipping')
    }



  return (
    <div className="cart-screen">
        <Button  className= "go-back" variant = 'outlined' onClick = {() => navigate('/')}> 
            <ArrowBackIcon className="icon"/>
            Go Back
        </Button>
        <div className="cart-screen-container">
            <div className="left">
            <div className="heading">Shopping Cart</div>
            {cartItems.length === 0  
                    ? (<>
                     <h2>Your Cart is Empty</h2>                     
                    </>)
                    :(
                     <div className="cart-items">
                          {cartItems.map(item => (
                              
                              <div className="cart-item">
                                  
                                  <Link to = {`/product/${item.product}`} className = "name-link">
                                  {item.name}
                                  </Link>

                                  <div className="price">&#8377;{item.price}</div>


                                  <div className="input-select">                                    
                                        <select required
                                        onChange={(e) =>clickHandler(e,item.product)}
                                        value={item.qty}
                                        >

                                        {
                                            [...Array(item.countInStock).keys()].map((x) =>(
                                                <option value={x+1}>{x+1}</option>                                   
                                                ))
                                        } 
                                        </select>                 
                                    </div>

                                    <IconButton 
                                    onClick = {() => removeFromCartHandler(item.product)}>
                                        <DeleteIcon className = "icon"/>
                                    </IconButton>
                              </div>
                          ))}

                     </div>
            )}
            </div>
            
            <div className="right">
                <div className="right-container">
                
                <div className="total-price">
                     Your total price is 
                     <span className="total-price-value">
                     &nbsp; &#8377;{cartItems.reduce((acc, item)=> acc+item.qty * item.price, 0).toFixed(2)}
                     </span>
                </div>

                <div className="total-items">Total Items are: 
                    <span className="total-items-value">
                    &nbsp; {cartItems.reduce((acc, item)=> acc+Number(item.qty), 0)}
                    </span>
                </div>

                <Button 
                    variant="contained" 
                    disabled = {cartItems.length === 0}
                    onClick = {checkoutHandler}
                    className="btn"
                    
                    > 
                    Proceed to checkout
                </Button>

                </div>
               
                
            </div>
        </div>
    </div>
  )
}

export default CartScreen