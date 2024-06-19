import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import checkCredentials from '../services/userServices';

const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isUser, setIsUser] = useState(true)

  const navigate = useNavigate()

  const login = async() => {
    credentianlsValidationChecks()
    let user = await checkCredentials({ userName: userName, password: password })
    if(user._id) navigate("/Home")
  }

  const credentianlsValidationChecks = () => {
    if (userName === "" && password === "") return
    if ('' === userName) {
      setEmailError('Please enter your username')
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
    setPasswordError('')
    setEmailError('')
  }


  if (!isUser) {
    return (<h1>Test</h1>)

  } else {
    return (
      <Box>
        <div className={'mainContainer'}>
          <div className={'titleContainer'}>
            <div>Login</div>
          </div>
          <br />
          <div className={'inputContainer'}>
            <TextField label="UserName" color="secondary" focused
              value={userName}
              // placeholder="Enter your username here"
              onChange={(ev) => {
                setUserName(ev.target.value)
                credentianlsValidationChecks()
              }}
              className={'inputBox'}
              sx={{ mb: 2 }}
            />
            <label className="errorLabel">{emailError}</label>

          </div>
          <br />
          <div className={'inputContainer'}>
            <TextField label="Password" color="secondary" focused
              value={password}
              // placeholder="Enter your email here"
              onChange={(ev) => {
                setPassword(ev.target.value)
                credentianlsValidationChecks()
              }}
              className={'inputBox'}
              sx={{ mb: 2 }}
            />

            <label className="errorLabel">{passwordError}</label>
          </div>
          <br />
            <Button variant="contained" onClick={login}>Login</Button>
          <Stack direction="row">
          <Typography variant="h5" component="h5">
            Don't have an account?
          </Typography>
          <Button onClick={login}>SignUp</Button>
          </Stack>
        </div>
      </Box>
    )
  }
}

export default Login