import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/header/Header';
import HomeScreen from './screens/home screen/HomeScreen';
import ProductScreen from './screens/product screen/ProductScreen';
import CartScreen from './screens/cart screen/CartScreen';
import LoginScreen from './screens/login screen/LoginScreen';
import './App.scss'


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>      
      <Route path = '/' element = {<HomeScreen/>}/>
      <Route path = '/product/:id' element = {<ProductScreen/>} />
      <Route path = '/cart/'>
        <Route path = ":id" element = {<CartScreen/>}/>
        <Route path = "" element ={<CartScreen/>}/>
      </Route>
      <Route path ='/login' element = {<LoginScreen/>}/>
       
     
      </Routes>  
   </BrowserRouter>
  );
}

export default App;
