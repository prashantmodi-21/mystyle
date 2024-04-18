import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../redux/apiCalls'

const Login = () => {
  const dispatch = useDispatch()
  const {currentUser, error} = useSelector(state=>state.user)
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const handleLogin = ()=>{
    adminLogin(dispatch, user)
  }
  useEffect(()=>{
    currentUser?.isAdmin && location.assign("/dashboard")
  }, [currentUser])
  return (
    <div className='flex justify-center items-center'>
    <div className='bg-[url("img/login.jpg")] bg-cover w-full h-screen opacity-50'></div>
    <div className='bg-white p-10 w-2/3 md:w-1/2 lg:w-1/3 space-y-4 absolute'>
      <h2 className='text-2xl'>Login</h2>
          <input type="text" placeholder='Username' name='username' className='text-sm w-full border rounded-md p-2' onChange={(e)=>setUser({...user, [e.target.name]: e.target.value})}/>
          <input type="password" placeholder='Password' name='password' className='text-sm w-full border rounded-md p-2 my-4' onChange={(e)=>setUser({...user, [e.target.name]: e.target.value})}/>
          <button className='text-sm bg-blue-700 hover:bg-blue-500 rounded-sm px-2 py-1 text-white' onClick={handleLogin}>Login</button>
          {error && <span className='text-red-500 block text-xs'>Enter Correct Credential</span>}
    </div>
  </div>
  )
}

export default Login
