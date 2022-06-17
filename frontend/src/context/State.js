import axios from 'axios'
import { useReducer, useEffect } from 'react'
import StateContext from './Context'
import StateReducer from './Reducer'


import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,

    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
   
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
  } 
  from './Constants'
  
import { useListProducts } from './ActionsHooks'


 


const State = ({ children }) => {

    const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []

    const userInfoFromStorage  = localStorage.getItem('userInfo')?
        JSON.parse(localStorage.getItem('userInfo')) : null


    // we can observe structure of state from here
    const initialState = {
        productlist : {products :[]},
        productDetails : {reviews:[],product:{}},  
        cart : {cartItems : cartItemsFromStorage},  
        userLogin:{userInfo: userInfoFromStorage}  
    
    }  

    // this is the most important line in context
     const [state, dispatch] = useReducer(StateReducer, initialState)
     

    //  const {listProducts} = useListProducts()

    const listProducts =  async() => {
        try{

            dispatch({type: PRODUCT_LIST_REQUEST })            

            const {data} = await axios.get('/api/products/')            

            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data })
        }
        catch(error){

            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message, 
            })

        }
    }

    const listProductDetails = async(id) => {
        try{

            console.log("inside list product details")

            dispatch({type: PRODUCT_DETAILS_REQUEST })

            const {data} = await axios.get(`/api/products/${id}`)
            
            console.log(id)
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data })           

            
        }
        catch(error){

            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message, 
            })

        }
    }


    const addToCart = async(id,qty) => {
        
        const {data} = await axios.get(`/api/products/${id}`)

        console.log("add to cart is called", qty)
        

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock : data.countInStock,
                qty

            }
        })

        // console.log(state.cart)

        localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems))

    }

    
    const removeFromCart = (id) => {

        dispatch({
            type : CART_REMOVE_ITEM,
            payload: id,
        })

        localStorage.setItem('cartItems', JSON.stringify(state.cart.cartItems))


    }

    const login = async(email, password) => {
        try{
            dispatch({
                type : USER_LOGIN_REQUEST
            })

            const {data} = await axios.post('/api/users/login', {email, password})

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })

            localStorage.setItem('userInfo', JSON.stringify(data))

        }
        catch(error){

            dispatch({
                type: USER_LOGIN_FAIL,
                payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message, 
            })

        }
    }

  

    return(
        <StateContext.Provider value ={{
            productlist : state.productlist,
            productDetails: state.productDetails,
            cart : state.cart,
            userLogin: state.userLogin,
            listProducts,            
            listProductDetails,
            addToCart,
            removeFromCart,
            login
           
           
            
        }}>

            {children}
        </StateContext.Provider>
    )

}

export default State