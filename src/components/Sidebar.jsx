import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/userServices";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

function Sidebar({ userId, profilePic, setProfilePic, setUserId }) {
  const options = [{ "Home": "home" }, { "Friends": "friends" }, { "Edit Profile": "edit-profile" }]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  React.useEffect(() => {
    getImage()
  }, [])

  const getImage = async () => {
    let res = await getUserInfo(userId)
    setProfilePic(res.profilePic)
  }

  const logOut = () => {
    setUserId("")
    dispatch(setUser({}))
    setProfilePic("")

    localStorage.setItem('userId', "")
    navigate("/Socia/login")
  }

  return (
    <Stack direction={"row"} justifyContent={"space-around"} width={"100%"} marginTop={1}>
      <Stack direction="row" spacing={2} width='60%' alignItems="center" justifyContent="space-around">
        <Avatar sx={{ width: 40, height: 40 }} src={profilePic}></Avatar>
        {options.map((p, index) => <Button key={index} onClick={() => navigate(`Socia/${Object.values(p).pop()}`)}>{Object.keys(p).pop()}</Button>)}
      </Stack>
      <Button onClick={logOut}>Logout</Button>
    </Stack>
  );
}
export default Sidebar;
