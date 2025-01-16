import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState, useRef } from 'react';
import { getUserInfo, updateUser } from '../services/userServices';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton'
import imageCompression from 'browser-image-compression'
import Slide from '@mui/material/Slide';
import { useSelector } from 'react-redux';


export const EditProfile = ({ setProfilePic }) => {
    const [user, setUser] = useState({})
    const [showNotification, setshowNotification] = useState(false)
    const inputRef = useRef(null);
    const userState = useSelector(state => state.user.userState)

    useEffect(() => {
        getUserInfo(userState._id).then(p => setUser(p))
    }, [])

    const Save = async () => {
        const res = await updateUser({ ...user, userName: user.userName, bio: user.bio, phoneNumber: user.phoneNumber, email: user.email })
        if (res) {
            setshowNotification(true)
        }
    }

    async function uploadProfilePic(event) {
        const imageFile = event.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            let base64 = await imageCompression.getDataUrlFromFile(compressedFile);
            let res = await updateUser({ ...user, profilePic: base64 });
            if (res) {
                setUser(res)
                setProfilePic(res.profilePic)
                setshowNotification(true)
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (<>
        <Snackbar
            open={showNotification}
            autoHideDuration={5000}
            message="Successfully updated profile!"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={() => { setshowNotification(false) }}
            TransitionComponent={Slide}
        />
        <Stack alignItems={"center"}>
            <h1>Hi {user.firstName} !</h1>
            <Stack >
                <IconButton
                    onClick={() => inputRef.current.click()}>
                    <Avatar
                        alt="Remy Sharp"
                        src={user.profilePic}
                        sx={{ width: "5rem", height: "5rem" }}
                    />
                </IconButton>
                <input type="file" style={{ display: 'none' }} ref={inputRef} accept="image/*" onChange={(e) => { uploadProfilePic(e) }}></input>
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