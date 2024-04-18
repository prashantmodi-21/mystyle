import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import { addUser } from '../redux/apiCalls'

const Signup = () => {
  const {currentUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: ''
  })
  const [error, setError] = useState()
  const handleUser = (e)=>{
    e.preventDefault()
    if(user.password === user.cpassword){
      addUser(dispatch, user)
    }else{
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2000);
    }
  }
  return (
    currentUser ? <Navigate to='/'/>: <div>
      <div className='flex justify-center items-center'>
        <div style={{backgroundImage: `url("img/sign-up.jpg")`, backgroundPosition: "center", backgroundSize: "cover", opacity: "0.5", height: "100vh", width: "100%"}}></div>
      <div className='bg-white p-10 w-2/3 md:w-1/2 lg:w-1/3 space-y-4 absolute'>
        <h2 className='text-2xl'>Register</h2>
            <input type="text" placeholder='Username' name='username' className='text-sm w-full border rounded-md p-2' onChange={(e)=>setUser({...user, [e.target.name]: e.target.value})}/>
            <input type="text" placeholder='Full Name' name='name' className='text-sm w-full border rounded-md p-2' onChange={(e)=>setUser({...user, [e.target.name]: e.target.value})}/>
            <input type="text" placeholder='Email' name='email' className='text-sm w-full border rounded-md p-2' onChange={(e)=>setUser({...user, [e.target.name]: e.target.value})}/>
            <input type="text" placeholder='Phone' name='phone' className='text-sm w-full border rounded-md p-2' onChange={(e)=>setUser({...user, [e.target.name]: parseInt(e.target.value)})}/>
            <input type="password" placeholder='Password' name='password' className='text-sm w-full border rounded-md p-2 my-4' onChange={(e)=>setUser({...user, [e.target.name]: e.target.value})}/>
            <input type="password" placeholder='Confirm Password' name='cpassword' className='text-sm w-full border rounded-md p-2 my-4' onChange={(e)=>setUser({...user, [e.target.name]: e.target.value})}/>
            <button className='text-sm bg-blue-700 hover:bg-blue-500 rounded-sm px-2 py-1 text-white' onClick={(e)=>handleUser(e)}>Signup</button>
            {error && <span className='text-red-500 block text-xs'>Password Not Match</span>}
            <a href="" className='block text-xs hover:underline'>Already Have an Account? Login</a>
      </div>
    </div>
    </div>
  )
}

export default Signup
