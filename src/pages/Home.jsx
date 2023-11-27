import React from 'react'
import Sidebar from '../components/Sidebar'
const Home = (user) => {
  return (
    <div>
      <Sidebar user={user}></Sidebar>
    </div>
  )
}

export default Home