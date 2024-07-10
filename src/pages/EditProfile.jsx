import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { saveUser } from '../services/userServices';

export const EditProfile = (profile) => {
    const [userName, setUserName] = useState(profile.userName)
    const [bio, setBio] = useState(profile.bio)
    const [email, setEmail] = useState(profile.email)
    const [phoneNumber, setPhoneNumber] = useState(profile.phoneNmber)

    const Save = async () => {
        const res = await saveUser({ ...profile, userName: userName, bio: bio, phoneNumber: phoneNumber, email: email })
    }
    return (<>
        <Stack alignItems={"center"}>
            <h1>Hi {profile.firstName} !</h1>
            <Avatar
                alt="Remy Sharp"
                src={profile.profilePic}
                sx={{ width: "5rem", height: "5rem" }}
            />
            <TextField label="UserName" color="secondary" focused
                value={userName} variant="standard"
                onChange={(ev) => setUserName(ev.target.value)}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <TextField label="Bio" color="secondary" focused
                value={bio} variant="standard"
                onChange={(ev) => setBio(ev.target.value)}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <TextField label="Email" color="secondary" focused
                value={email} variant="standard"
                onChange={(ev) => setEmail(ev.target.value)}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <TextField label="Phone" color="secondary" focused
                value={phoneNumber} variant="standard"
                onChange={(ev) => setPhoneNumber(ev.target.value)}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <Button variant="contained" color="secondary" onClick={Save}>Save</Button>
        </Stack>

    </>)
}