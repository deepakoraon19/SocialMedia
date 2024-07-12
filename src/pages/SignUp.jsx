import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUser } from '../services/userServices';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Switch from '@mui/material/Switch';
import dayjs from 'dayjs';
import createHash from '../Utils/Hashing';
import UserContext from '../contexts/userContext';


const SignUp = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [dob, setDob] = useState(null)
    const [gender, setGender] = useState(true)
    const [phone, setPhone] = useState("")
    const [enableSignUp, setenableSignUp] = useState(false)
    const { userId, setUserId } = useContext(UserContext)

    const navigate = useNavigate()

    const signUp = async () => {
        credentianlsValidationChecks()
        let user = await saveUser({ userName: userName, password: createHash(password), firstName: firstName, lastName: lastName, gender: gender, dateOfBirth: dob.format(), phoneNumber: Number(phone) })
        if (user._id) {
            localStorage.setItem("userId", user._id)
            setUserId(user._id)
            navigate("/Socia/edit-profile")
        }
    }

    const credentianlsValidationChecks = () => {
        setenableSignUp(false)
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
        setenableSignUp(true)
        setPasswordError('')
        setEmailError('')
    }

    return <Box>
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>SignUP</div>
            </div>
            <br />
            <Stack direction={"row"} gap={1}>
                <div className={'inputContainer'}>
                    <TextField label="First Name" color="secondary" focused
                        value={firstName}
                        onChange={(ev) => {
                            setfirstName(ev.target.value)
                            credentianlsValidationChecks()
                        }}
                        className={'inputBox'}
                        sx={{ mb: 2, width: 1, mr: 5 }}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <div className={'inputContainer'}>
                    <TextField label="Last Name" color="secondary" focused
                        value={lastName}
                        onChange={(ev) => {
                            setlastName(ev.target.value)
                            credentianlsValidationChecks()
                        }}
                        className={'inputBox'}
                        sx={{ mb: 2, width: 1, mr: 5 }}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
            </Stack>
            <br />
            <Stack direction={"row"} gap={1}>
                <div className={'inputContainer'}>
                    <TextField label="UserName" color="secondary" focused
                        value={userName}
                        // placeholder="Enter your username here"
                        onChange={(ev) => {
                            setUserName(ev.target.value)
                            credentianlsValidationChecks()
                        }}
                        className={'inputBox'}
                        sx={{ mb: 2 ,width: 1, mr: 5 }}
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <div className={'inputContainer'}>
                    <TextField label="Phone Number" color="secondary" focused
                        value={phone}
                        onChange={(ev) => {
                            setPhone(ev.target.value)
                        }}
                        className={'inputBox'}
                        sx={{ mb: 2, width: 1, mr: 5  }}
                    />
                </div>
            </Stack>
            <br />
            <div className={'inputContainer'}>
                <TextField label="Password" color="secondary" focused
                    value={password}
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
            <Stack direction="row" gap={3}>
                <Stack direction={"row"} alignItems={"center"}>
                    <Typography>Male</Typography>
                    <Switch defaultChecked color="secondary" value={gender} onChange={() => setGender(!gender)} />
                    <Typography>Female</Typography>
                </Stack>
                <Stack direction={"row"} gap={2} alignItems={"center"}>
                    <Typography >Date of birth</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker value={dob} onChange={setDob} referenceDate={dayjs('2022-04-17T15:30')}></DatePicker>
                    </LocalizationProvider>
                </Stack>
            </Stack>
            <br />
            <Button variant="contained" onClick={signUp} disabled={!enableSignUp}>SignUP</Button>
            <Stack direction="row">
                <Typography variant="h5" component="h5">
                    Don't have an account?
                </Typography>
                <Button onClick={() => { navigate("/login") }}>Login</Button>
            </Stack>
        </div>
    </Box>
}

export default SignUp