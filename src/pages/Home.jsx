import React, { useContext, useEffect, useState } from 'react'
import { getUserInfo } from '../services/userServices'
import { useNavigate } from 'react-router'
import UserContext from '../contexts/userContext'
import { Stack } from '@mui/material'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../slices/userSlice'
import { getDistance } from 'geolib';

const Home = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId") ?? ""
  const [coordinates, setCoordinates] = useState(null);

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
    if (userState._id) {
      let res = await getUserInfo(userState._id)
      dispatch(setUser(res))
    } else if (userId) {
      let res = await getUserInfo(userId)
      dispatch(setUser(res))
    } else {
      navigate("/Socia/login")
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          // console.log(position)
          // console.log(getDistance(position.coords, { latitude: 51.5103, longitude: 7.49347 }))
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );

    } else {
      console.error('Geolocation not supported by your browser.');
    }
  }, []);

  return (
    <Stack style={{ margin: 'auto' }} width="80%" alignItems={"center"} spacing={2}>
      {/* <h1>Home</h1> */}
      {/* {data.map((p, index) => <Post key={index} createdOn={p.createdOn} captions={p.caption} image={p.image} userName={p.userName}></Post>)} */}
    </Stack>
  )
}

export default Home