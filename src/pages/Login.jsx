import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isUser, setIsUser] = useState(true)

  const navigate = useNavigate()

  const onButtonClick = () => {
    // You'll update this function later...
    // Set initial error values to empty
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email')
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return
    }

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    // Authentication calls will be made here...
  }

  if(!isUser){
  return (<h1>Test</h1>)

    }else{
return(
      <Box>
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Login</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <TextField label="Email" color="secondary" focused
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
            sx={{ mb: 2 }}
          />
          <label className="errorLabel">{emailError}</label>
          {/* <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label> */}
        </div>
        <br />
        <div className={'inputContainer'}>
          <TextField label="Password" color="secondary" focused
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
            sx={{ mb: 2 }}
          />
          {/* <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        /> */}
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <Typography variant="h5" component="h5">
            Don't have an account ? SignUP
        </Typography>
        <Stack>
          <Button variant="contained" action={onButtonClick}>Login</Button>
        </Stack>
      </div>
    </Box>
  )
}}

export default Login