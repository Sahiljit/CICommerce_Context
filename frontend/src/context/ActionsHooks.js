//  i want to define the functions that are defined in State.js here
//  but i don't know how to export dispatch here till now



// import axios from 'axios'
// import React, {useContext} from 'react'
// import StateContext from './Context'

// import {
//     PRODUCT_LIST_REQUEST,
//     PRODUCT_LIST_SUCCESS,
//     PRODUCT_LIST_FAIL,

//     PRODUCT_DETAILS_FAIL,
//     PRODUCT_DETAILS_SUCCESS,
//     PRODUCT_DETAILS_REQUEST,

//     CART_ADD_ITEM,
//     CART_REMOVE_ITEM,
//   } 
//   from './Constants'



// export const  useListProducts = () => {
    
//     const {dispatch} = useContext(StateContext)
    

    // const listProducts = async()=>{
    //     try{

    //         dispatch({type: PRODUCT_LIST_REQUEST })            
    
    //         const {data} = await axios.get('/restapi/products/')            
    
    //         dispatch({
    //             type: PRODUCT_LIST_SUCCESS,
    //             payload: data })
    //     }
    //     catch(error){
    
    //         dispatch({
    //             type: PRODUCT_LIST_FAIL,
    //             payload: error.response && error.response.data.message
    //             ? error.response.data.message
    //             : error.message, 
    //         })
    
    //     }

    // }

    // return {listProducts}

   
// }


