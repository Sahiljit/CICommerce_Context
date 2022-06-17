import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';

import './Header.scss'

const Header = () => {

  const navigate = useNavigate()

  return (
    <div className="header">
        <div className="heading" onClick = {() => navigate('/')}>CICommerce</div>
        <nav className="navigation">
            <Button className="btn" onClick = {() => navigate('/cart')}>
              Cart
              <ShoppingCartIcon className="icon"/>
            </Button>
            <Button className="btn" onClick = {() => navigate('/login')}>
             Login
             <LoginIcon className="icon"/>
            </Button>
        </nav>

    </div>
  )
}

export default Header