import React, {useState, useEffect, useContext} from 'react'
import StateContext from '../../context/Context'
import Product from '../../components/productCard/Product'
import './HomeScreen.scss'




const HomeScreen = () => {

  const {productlist, listProducts} = useContext(StateContext)
  const {error,loading,products} = productlist

  useEffect(()=>{
      listProducts()    

  }, [])



  return (
    <div className="homeScreen">

      {loading? 
      <h1>loading..</h1>
      
      : error ? {error}
      : 
      <>
      <div className ="heading">Recommended Books</div>
      <div className="grid-container">
        {products.map(product => (
          <Product product = {product}/>
        ))}
      </div>

      </>}

      
    </div>
  )
}

export default HomeScreen