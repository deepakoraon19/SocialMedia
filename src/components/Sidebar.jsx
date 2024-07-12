import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar(user) {
  const options = [{ "Home": "home" }, { "Friends": "friends" }, { "Edit Profile": "edit-profile" }]
  const navigate = useNavigate()
  return (
    <Stack direction="row" spacing={2} width='60%' alignItems="center" justifyContent="space-around">
      <Avatar sx={{ width: 60, height: 60 }} src="https://i.pinimg.com/originals/e0/d7/9d/e0d79ddbcfb5bdaf07ace631b83db7ae.jpg"></Avatar>
      <h2>{user.name}</h2>
      {options.map((p, index) => <Button key={index} onClick={() => navigate(`Socia/${Object.values(p).pop()}`)}>{Object.keys(p).pop()}</Button>)}
    </Stack>
  );
}
export default Sidebar;
