import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { getUserInfo, saveUser, updateUser } from '../services/userServices';
import UserContext from '../contexts/userContext';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton'
import imageCompression from 'browser-image-compression'
import { Input } from '@mui/material';


export const EditProfile = () => {
    const { userId } = useContext(UserContext);
    const [user, setUser] = useState({})
    const [showNotification, setshowNotification] = useState(false)
    useEffect(() => {
        getUserInfo(userId).then(p => setUser(p))
    }, [])

    const Save = async () => {
        const res = await updateUser({ ...user, userName: user.userName, bio: user.bio, phoneNumber: user.phoneNumber, email: user.email })
        if (res) {
            showNotification(true)
        }
    }

    async function uploadProfilePic(event) {
        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            let base64 = await imageCompression.getDataUrlFromFile(compressedFile);
            console.log('compressedFile instanceof Blob', base64); // true
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

            let res = await updateUser({ ...user, profilePic: base64 }); // write your own logic
            if (res) {
                showNotification(true)
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (<>
        <Snackbar
            open={showNotification}
            autoHideDuration={5000}
            message="Saved"
        />
        <Stack alignItems={"center"}>
            <h1>Hi {user.firstName} !</h1>
            <Stack >

                <IconButton
                    onClick={() => alert('Hiii')}>
                    <Avatar
                        alt="Remy Sharp"
                        src={user.profilePic}
                        sx={{ width: "5rem", height: "5rem" }}
                    />
                </IconButton>
                <Input inputComponent={"NewAvatar"} type="file" accept="image/*" onChange={(e) => { uploadProfilePic(e) }}></Input>
                {/* <button>Add</button> */}
            </Stack>
            <TextField label="UserName" color="secondary" focused
                value={user.userName} variant="standard"
                onChange={(ev) => setUser({ ...user, userName: ev.target.value })}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <TextField label="Bio" color="secondary" focused
                value={user.bio} variant="standard"
                onChange={(ev) => setUser({ ...user, bio: ev.target.value })}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <TextField label="Email" color="secondary" focused
                value={user.email} variant="standard"
                onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <TextField label="Phone" color="secondary" focused
                value={user.phoneNumber} variant="standard"
                onChange={(ev) => setUser({ ...user, phoneNumber: ev.target.value })}
                className={'inputBox'}
                sx={{ my: 2 }}
            />
            <Button variant="contained" color="secondary" onClick={Save}>Save</Button>
        </Stack>

    </>)
}