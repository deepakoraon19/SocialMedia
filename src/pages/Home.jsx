import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../services/userServices'
import { useNavigate } from 'react-router'

const Home = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    console.log("here")
    var userId = localStorage.getItem("userId")
    if (!userId) navigate("/Socia/login")
    let user = await getUserInfo(userId)
    setUser(user)
  }

  return (
    <>
      {user === null ? <h1>Loading</h1> : <h1>Hi {user.firstName}</h1>}
    </>
  )
}

export default Home