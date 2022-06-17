import React, {useEffect, useContext, useState} from 'react'
import StateContext from '../context/Context'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'

import {Button, Container, Card, CardMedia, Grid, Typography, Divider, Rating,
        Box, InputLabel, MenuItem, FormControl, Select, IconButton} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';


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
        <div>
             
            <Grid container pt = {2}>
            <Grid ml ={10} mb={2} container>
            <h1>Shopping Cart</h1>
            </Grid>
            <Grid container ml={8}>
            
                <Grid item md={8}>
                    {cartItems.length === 0  
                    ? (<>
                     <h2>Your Cart is Empty</h2>
                        <Link to ="/">GO BACK</Link>
                    </>)
                    :(
                        <Grid>
                            <Grid item pl={6} pt={2}>
                                {cartItems.map(item => (
                                    <Grid container  pb ={4}>
                                    <Grid item pr={2}>
                                    <Typography mb={2} gutterBottom variant="h6" component="div">
                                    <Link to = {`/product/${item.product}`}>{item.name}</Link>
                                        </Typography> 
                                    </Grid>
                                    <Grid item pr={2}>
                                    &#8377; {item.price}
                                    </Grid>

                                    {/* <Grid item pr ={2}>
                                        {item.qty}
                                    </Grid> */}

                                    <Grid item pr={2}>
                                     <Box sx={{ minWidth: 120 }}>
                                        <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={item.qty}
                                        label="Quantity"
                                        onChange={(e) =>clickHandler(e,item.product)}
                                        >
                                        {
                                            [...Array(item.countInStock).keys()].map((x) =>(
                                                <MenuItem value={x+1}>{x+1}</MenuItem>                                   
                                                ))
                                        }
                                        
                                
                                        </Select>
                                        </FormControl>
                                        </Box>
                                    </Grid>

                                    <Grid item  pr={2}>
                                    <IconButton 
                                    aria-label="delete"
                                    color="primary"
                                    onClick = {() => removeFromCartHandler(item.product)}>
                                        <DeleteIcon />
                                    </IconButton>

                                    </Grid>
                                    </Grid>
                                ))}
                            </Grid>

                        </Grid>
                    )}

                </Grid>
                <Grid item md={2}>
                    <Grid pb={2}>
                    <h2>Total Items are :{cartItems.reduce((acc, item)=> acc+Number(item.qty), 0)}</h2>
                    <Typography mb={2} gutterBottom variant="h6" component="div">
                    Your total price is &#8377;
                     {cartItems.reduce((acc, item)=> acc+item.qty * item.price, 0).toFixed(2)}
                    </Typography> 
                  
                    </Grid>

                    <Grid>
                    <Button 
                    variant="contained" 
                    disabled = {cartItems.length === 0}
                    onClick = {checkoutHandler}
                    
                    > 
                    Proceed to checkout
                    </Button>

                    </Grid>
                    
                </Grid>
            
            </Grid>

            </Grid>
            
        </div>
    )
}

export default CartScreen
