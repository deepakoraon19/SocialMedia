import React, { useContext, useEffect, useState } from 'react'
import { getUserInfo } from '../services/userServices'
import { useNavigate } from 'react-router'
import UserContext from '../contexts/userContext'

const Home = () => {
  const [loggedInUser, setloggedInUser] = useState(null)
  const navigate = useNavigate()
  const { userId } = useContext(UserContext)
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    if (userId === "") navigate("/Socia/login")
    let res = await getUserInfo(userId)
    setloggedInUser(res)
  }

  return (
    <>
      {/* {loggedInUser === null ? <h1>Loading</h1> : <h1>Hi {loggedInUser.firstName}</h1>} */}
    </>
  )
}

export default Home