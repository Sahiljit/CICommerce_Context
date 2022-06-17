import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import StateContext from '../../context/Context'
import {Button}  from '@mui/material'

import './LoginScreen.scss'

const LoginScreen = () => {


      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')

      const {userLogin, login} = useContext(StateContext)
      const {loading, error,  userInfo} = userLogin

      const navigate = useNavigate()

      const queryString = useLocation().search
      const queryParams = new URLSearchParams(queryString)
      const redirect = queryParams.get("redirect") ? queryParams.get("redirect") : '/'

      // IMPORTANT: this useEffect will help us to know whether we are already logged-in or not
      useEffect(()=>{
        if(userInfo){
          navigate(redirect)
        }
      }, [userInfo, redirect])



      const clickHandler = (e)=>{
        e.preventDefault()

        login(email, password)       
        }


  return (
    <div className="login-screen">

        {loading && 
            <h2>loading...</h2>
        }
        {
          error &&
          <h3>{error}</h3>
        }

        <div className="login-screen-container">

          <div className="heading">SIGN IN</div>

          <div className="input-field">
            <input type="text" id="name" required onChange={(e) => setEmail(e.target.value)}/>
            <label for="name">Enter Email</label>
          </div>

          <div className="input-field">
            <input type="password" id="password" required onChange ={(e)=> setPassword(e.target.value)}/>
            <label for="password">Enter Password</label>
          </div>

          <Button 
            variant="contained" 
            onClick = {clickHandler}
            className="btn"           
            > 
            SIGN IN
        </Button>

        <div className="new-user">
          <span>New User??</span>
          <Button
          onClick = {() => {redirect? navigate(`/register?redirect=${redirect}`) : navigate('/register')}}
          className = "btn-primary"
          // variant="outlined"
        >
          Register
        </Button>
        </div>





        </div>        
    </div>
  )
}

export default LoginScreen