import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { userLogin } from '../redux/apiCalls'

const Login = () => {
  const {currentUser, error} = useSelector(state=>state.user)
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const dispatch = useDispatch()
  const handleLogin = async(e)=>{
    e.preventDefault()
    userLogin(dispatch, {username, password})
  }
  useEffect(()=>{
    currentUser && location.assign("/")
  }, [currentUser])
  return (
    <div className='flex justify-center items-center'>
      <div className='bg-[url("img/login.jpg")] bg-cover w-full h-screen opacity-50'></div>
      <div className='bg-white p-10 w-2/3 md:w-1/2 lg:w-1/3 space-y-4 absolute'>
        <h2 className='text-2xl'>Login</h2>
            <input type="text" placeholder='Email' className='text-sm w-full border rounded-md p-2' onChange={(e)=>setusername(e.target.value)}/>
            <input type="password" placeholder='Password' className='text-sm w-full border rounded-md p-2 my-4' onChange={(e)=>setpassword(e.target.value)}/>
            <button className='text-sm bg-blue-700 hover:bg-blue-500 rounded-sm px-2 py-1 text-white' onClick={(e)=>handleLogin(e)}>Login</button>
            {error && <span className='text-red-500 block text-xs'>Enter Correct Credential</span>}
            <Link to="/register"><span className='block text-xs hover:underline'>Don't Have an Account? Register</span></Link>
      </div>
    </div>
  )
}

export default Login
