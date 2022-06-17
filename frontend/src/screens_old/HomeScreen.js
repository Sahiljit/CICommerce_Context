import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import StateContext from '../context/Context'
import {Grid, Box, Button, Container, CircularProgress} from '@mui/material'
import Product from '../components1/product card/Product'



const HomeScreen = () => {

    // const [products, setProducts] = useState([])
    // useEffect(()=>{
      
    //     const fetchProducts = async() =>{
    //         const {data} = await axios.get('/restapi/products')
    //         setProducts(data)
            
    //     }
    //     fetchProducts()

    // }, [])

    const {productlist, listProducts} = useContext(StateContext)
    const {error,loading,products} = productlist

    useEffect(()=>{
        listProducts()    

    }, [])
  


    return (
        <div>
            <h1>Recommended Books</h1>
            {loading ?
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
            :error ? <h3>{error}</h3>
            :
            <Container maxWidth = "lg">
            <Grid container spacing = {6} justifyContent = "center">               
                    {products.map(product => (
                       <Grid item md = {4}>
                            <Product product = {product}/>
                        </Grid>                      
                    ))}      
            </Grid>
            </Container>}
            
            
        </div>
    )
}

export default HomeScreen
