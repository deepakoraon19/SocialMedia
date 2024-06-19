import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";

function Sidebar(user) {
  const options = ["News Feed", "Message", "Forums", "Friends", "Media", "Settings"]
  return (
    <Stack direction="row" spacing={2} width='10vw' alignItems="center">
      <Avatar sx={{ width: 60, height: 60 }} src="https://i.pinimg.com/originals/e0/d7/9d/e0d79ddbcfb5bdaf07ace631b83db7ae.jpg"></Avatar>
      <h2>{user.name}</h2>
      {options.map((p,index) => <Button key={index} >{p}</Button>)}
    </Stack>
  );
}
export default Sidebar;
