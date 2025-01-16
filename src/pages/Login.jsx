import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { checkCredentials } from '../services/userServices';
import createHash from '../Utils/Hashing';
import { useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';

const Login = ({ setUserId }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [enableLogin, setEnableLogin] = useState(false)

  const login = async () => {
    if (!credentianlsValidationChecks()) return
    let res = await checkCredentials({ userName: userName, password: createHash(password) })
    if (res !== null) {
      setUserId(res._id)
      localStorage.setItem("userId", res._id)
      dispatch(setUser(res))
      navigate("/Socia/home")
    } else {
      console.log(createHash(password))
    }
  }

  const credentianlsValidationChecks = () => {
    setEnableLogin(false)
    if (userName === "" && password === "") return
    if ('' === userName) {
      setEmailError('Please enter your username')
      return false
    }

    if ('' === password) {
      setPasswordError('Please enter a password')
      return false
    }

    if (password.length < 5) {
      setPasswordError('The password must be 8 characters or longer')
      return false
    }
    setEnableLogin(true)
    setPasswordError('')
    setEmailError('')
    return true;
  }

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
          <TextField label="Password" color="secondary" focused type='password'
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
        <Button variant="contained" onClick={login} disabled={!enableLogin}>Login</Button>
        <Stack direction="row">
          <Typography variant="h5" component="h5">
            Don't have an account?
          </Typography>
          <Button onClick={() => { navigate("/socia/signup") }}>SignUp</Button>
        </Stack>
      </div>
    </Box>
  )
}


export default Login