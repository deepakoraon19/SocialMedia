import React, { useContext, useEffect, useState } from 'react'
import { getUserInfo } from '../services/userServices'
import { useNavigate } from 'react-router'
import UserContext from '../contexts/userContext'
import { Stack } from '@mui/material'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../slices/userSlice'

const Home = () => {
  const [loggedInUser, setloggedInUser] = useState(null)
  const navigate = useNavigate()
  const { userId } = useContext(UserContext)
  const data = [{
    userId: "66910312bd5e781258b05460",
    createdOn: "2024-07-12T10:18:58.575Z", // Sample timestamp
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
    caption: "A beautiful red sports car.",
    userName: "deepak19___"
  },
  {
    userId: "66910312bd5e781258b05460",
    createdOn: "2024-07-12T10:18:58.575Z", // Sample timestamp
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
    caption: "Classic vintage car.",
    userName: "deepak19___"
  },
  {
    userId: "66910312bd5e781258b05460",
    createdOn: "2024-07-12T10:18:58.575Z", // Sample timestamp
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    caption: "Sleek black sedan.",
    userName: "deepak19___"
  },
  {
    userId: "66910312bd5e781258b05460",
    createdOn: "2024-07-12T10:18:58.575Z", // Sample timestamp
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753",
    caption: "Sample timestamp",
    userName: "deepak19___"
  },
  {
    userId: "66910312bd5e781258b05460",
    createdOn: "2024-07-12T10:18:58.575Z", // Sample timestamp
    image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    caption: "Electric car in a cityscape.",
    userName: "deepak19___"
  }
  ]

  const dispatch = useDispatch();
  const userState = useSelector(state => state.user.userState)
  useEffect(() => {
    getUser()
  }, [])


  const getUser = async () => {
    if (userId === "") navigate("/Socia/login")
    let res = await getUserInfo(userId)
    setloggedInUser(res)
    dispatch(setUser(res))
  }

  return (
    <Stack style={{ margin: 'auto' }} width="80%" alignItems={"center"} spacing={2}>
      {data.map((p, index) => <Post key={index} createdOn={p.createdOn} captions={p.caption} image={p.image} userName={p.userName}></Post>)}
    </Stack>
  )
}

export default Home