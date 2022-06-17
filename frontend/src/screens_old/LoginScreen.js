import React, {useState, useEffect, useContext} from 'react'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import StateContext from '../context/Context'


import {Button, Container, Card, CardMedia, Grid, Typography, Divider, Rating,
  Box, InputLabel, CircularProgress,MenuItem, FormControl, Select, IconButton, TextField} from '@mui/material'


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
    <Box ml={80} mt={20}>
       {loading && 
            <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            </Box>
        }
        {
          error &&
          <h3>{error}</h3>
        }
            

            <Grid container rowSpacing={2}>

                <Grid item md={12}>
                <Typography variant="h5" >
                    SIGN IN
                </Typography>
                </Grid>

                <Grid item md={12}>
                <TextField onChange={(e) => setEmail(e.target.value)} label="enter email" variant="outlined" />                
                </Grid>

                <Grid item md={12}>
                <TextField onChange ={(e)=> setPassword(e.target.value)} label="enter password" variant="outlined" />                
                </Grid>

                <Grid item md={12}>
                <Button variant="contained"
                onClick = {clickHandler}>SIGN IN</Button>                
                </Grid>

                <Grid item md={12}>
                {/* <Typography mr ={2} variant="h7"  >
                    New User?? 
                </Typography> */}
                <Link to ={ redirect? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                {/* <Button>Register</Button> */}

                </Grid>

            </Grid>

</Box>
  )
}

export default LoginScreen