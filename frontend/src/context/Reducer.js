import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
  } 
  from './Constants'

const StateReducer = (state, action) => {
    switch(action.type){


        //reducers for home screen
        case PRODUCT_LIST_REQUEST:{
            return{
                ...state,
                productlist: {loading: true, products:[]},
            }
        }
        case PRODUCT_LIST_SUCCESS:{
            return{
                ...state,
                productlist: {loading: false, products: action.payload}
            }
        }
        case PRODUCT_LIST_FAIL:{
            return{
                ...state,
                productlist: {loading:false, error: action.payload}
            }
        }


        // reducers for product screen
        case PRODUCT_DETAILS_REQUEST:{
            return{
                ...state,
                productDetails: {...state.productDetails,loading: true}
            }
        }
        case PRODUCT_DETAILS_SUCCESS:{
            console.log("product details is a success")
            return{
                ...state,
                productDetails: {...state.productDetails,loading: false, product: action.payload}
            }
        }
        case PRODUCT_DETAILS_FAIL:{
            return{
                ...state,
                productDetails: {...state.productDetails,loading: false, error: action.payload}
            }
        }


        // reducers of cart screen
        case CART_ADD_ITEM : {

            console.log("cart add item is dispatched")

            const item = action.payload
            const existItem = state.cart.cartItems.find((x) => x.product === item.product)

            console.log(existItem)

            if(existItem){
                console.log("item exists1")
                return{
                    ...state,          
                    cart: {...state.cart, cartItems : state.cart.cartItems.map(x =>
                        x.product === existItem.product ? item : x)},
                }
            }
            else{
                console.log("item doesnot exists")
                return{
                    ...state,
                    cart : {...state.cart, cartItems: [...state.cart.cartItems, item]},
                }
            }

           
        }
        case CART_REMOVE_ITEM:{
            return{
                ...state,
                cart : {...state.cart, 
                        cartItems: state.cart.cartItems.filter(x => x.product !== action.payload)}
            }
        }

        
        
        // reducers of logning screen
        case USER_LOGIN_REQUEST:{
                return{
                    ...state,
                    userLogin : {...state.userLogin, loading: true}
    
                }
            }
        case USER_LOGIN_SUCCESS:{
                return{
                    ...state,
                    userLogin : {...state.userLogin, loading: false, userInfo: action.payload}
                }
            }
        case USER_LOGIN_FAIL:{
                return{
                    ...state,
                    userLogin : {...state.userLogin, loading: false, error: action.payload}
                }
            }
        case USER_LOGOUT:{
                return{
                    ...state,
                    userLogin : {}
                }
            }
    

        
        
        default:
            return state

    }

}

export default StateReducer