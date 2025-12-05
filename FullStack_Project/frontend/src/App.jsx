import { useState,useEffect } from 'react'

import './App.css'

function App() {
  const [message, setMessage] = useState('')

  useEffect(()=>{
    fetch("http://localhost:8000/api/message")
    .then((res)=>res.json())
    .then((data)=>setMessage(data.message))
    .catch((err)=>{
      console.log("Error Fetching Message",err)
    })
  },[])

  return (
    <>
       <h1>Welcome to the frontend page</h1>
       <h2>Data {message}</h2>
    </>
  )
}

export default App
