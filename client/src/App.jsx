
import Login from './pages/Login'
import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import axios from "axios"
export const ServerUrl = "http://localhost:8000"
export const CLIENT_URL = "http://localhost:5173"

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {

    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()

  }, [])

  return (
     <Routes>
       <Route path='/login' element={<Login setUser={setUser}/>} />
     </Routes>
  )
}

export default App