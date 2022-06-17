import axios from 'axios'
import React, { useEffect,useContext, useState } from 'react'
import StateContext from '../context/Context';
import {Button, Container, Card, CardMedia, Grid, Typography,
        Divider, Rating,CircularProgress,Box,InputLabel, MenuItem,
        FormControl,Select} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import {Link as RouterLink, useParams, useNavigate} from 'react-router-dom'



const useStyles = makeStyles({
    root: {
      paddingTop: 30
    },
  });
  


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

    const classes = useStyles();
    return (
        <Container className = {classes.root} maxWidth = "lg" >
            <Button  component = {RouterLink} to = "/" variant = "outlined"  startIcon = {<ArrowBackIcon/>}>
                GO BACK
            </Button>


            {loading?
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
            :error ? <h3>{error}</h3>
            :
            <Grid container mt ={2} pt = {2} spacing = {6}>
                <Grid container mb = {4}>
                <Grid item mb={2} mr ={10} md = {6}>
                    <Card>
                        <CardMedia 
                        component = "img"
                        image= {product.image}
                        alt = {product.name}
                        />
                    </Card>
                </Grid>
               

                <Grid item md = {3}>
                        <Typography mb ={4} gutterBottom variant="h5" component="span">
                             Price : &#8377; {product.price}
                        </Typography>
                        <Divider  />
                        <Grid mt={2}>
                        Status : {product.countInStock >0 ? 'In stock' : 'Out of Stock'}
                        </Grid>                
                        

                        
                      <Grid mt={2}>
                      {product.countInStock >0 && (
                           <Box sx={{ minWidth: 120 }}>
                           <FormControl fullWidth>
                               <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                               <Select
                               labelId="demo-simple-select-label"
                               id="demo-simple-select"
                               value={qty}
                               label="Quantity"
                               onChange={(e)=>{setQty(e.target.value)}}
                               >
                            {
                                [...Array(product.countInStock).keys()].map((x) =>(
                                    <MenuItem value={x+1}>{x+1}</MenuItem>                                   
                                    ))
                            }
                              
                    
                            </Select>
                           </FormControl>
                             </Box>
                      )}
                      </Grid>
                       
                <Grid mt={2}>
                <Button variant = "contained" onClick= {addToCartHandler}  disabled = {product.countInStock === 0} > Add to Cart</Button>
                </Grid>
                </Grid>

                </Grid>

                <Grid container  mt = {2} pt = {5}>
                <Grid item md = {6} >                   

                    <Grid spacing = {6} rowSpacing = {5}>   

                    <Grid item md = {12} >
                    <Typography mb={2} gutterBottom variant="h4" component="div">
                    {product.name}
                    </Typography>                     
                    <Divider/>
                    </Grid>



                    <Grid item mb={2} mt = {2}>
                    <Rating name="half-rating-read" value={product.rating}  precision={0.5} readOnly />
                    <Typography gutterBottom variant="h8" component="span">
                        {product.numReviews} reviews
                    </Typography>
                                       
                    </Grid>

                    <Grid item md = {12}>
                    <Typography gutterBottom variant="h6" component="span">
                        Price : &#8377; {product.price}
                    </Typography>
                    <Divider/>
                    </Grid>

                    <Grid mb={10} mt={2} item>
                    <Typography gutterBottom variant="h5" mr={1} component="div">
                        Description 
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                         {product.description}
                    </Typography>
                  
                    </Grid>


                    </Grid>

                    </Grid>
                </Grid>

            </Grid>}

            

        
          
        </Container>
    )
}

export default ProductScreen
