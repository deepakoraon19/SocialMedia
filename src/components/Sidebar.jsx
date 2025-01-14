import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../services/userServices";
import UserContext from "../contexts/userContext";

function Sidebar({ name, profilePic, setProfilePic }) {
  const options = [{ "Home": "home" }, { "Friends": "friends" }, { "Edit Profile": "edit-profile" }]
  const navigate = useNavigate()
  const { userId } = React.useContext(UserContext)

  React.useEffect(() => {
    getImage()
  }, [])

  const getImage = async () => {
    let res = await getUserInfo(userId)
    setProfilePic(res.profilePic)
  }

  const logOut = () => {
    setProfilePic("")
    localStorage.setItem('userId', "")
    navigate("/Socia/login")
  }

  return (
    <Stack direction={"row"} justifyContent={"space-around"} width={"100%"}>
      <Stack direction="row" spacing={2} width='60%' alignItems="center" justifyContent="space-around">
        <Avatar sx={{ width: 60, height: 60 }} src={profilePic}></Avatar>
        <h2>{name}</h2>
        {options.map((p, index) => <Button key={index} onClick={() => navigate(`Socia/${Object.values(p).pop()}`)}>{Object.keys(p).pop()}</Button>)}
      </Stack>
      <Button onClick={logOut}>Logout</Button>
    </Stack>
  );
}
export default Sidebar;
