import React, { useEffect, useState } from 'react'
import { getUserInfo } from '../services/userServices'

const Home = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    let user = await getUserInfo(localStorage.getItem("userId"))
    setUser(user)
  }

  return (
    <>
      {/* <Sidebar user={user}></Sidebar> */}
      {user === null ? <h1>Loading</h1> : <h1>Hi {user.firstName}</h1>}

    </>
  )
}

export default Home