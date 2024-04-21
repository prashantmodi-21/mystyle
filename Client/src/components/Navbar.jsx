import React, { useEffect } from 'react'
import { Badge } from '@mui/material';
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/userRedux';
const Navbar = () => {
  const dispatch = useDispatch()
  const {quantity} = useSelector(state=>state.cart)
  const {currentUser} = useSelector(state=>state.user)
  return (
    <nav className='flex justify-between items-center p-4 bg-slate-50'>
        <div className='hidden sm:flex justify-center flex-1'>
          <div className='relative'>
            <input className='text-sm px-2 py-1 rounded-md' type="text" placeholder='Search' />
            <SearchIcon className='absolute right-1 top-1 cursor-pointer'/>
          </div>
        </div>
        <div className='flex sm:justify-center flex-1'>
            <Link to='/'><span className='text-none text-2xl'>MyStyle</span></Link>
        </div>
        <div className='flex justify-end sm:justify-center flex-1 space-x-2 sm:space-x-6 text-gray-500'>
          {currentUser ? <button className='text-xs sm:text-sm' onClick={()=>dispatch(logoutSuccess())}>Logout</button> :<><Link to='/login'><span className='text-xs sm:text-sm'>Login</span></Link>
          <Link to='register'><span className='text-xs sm:text-sm'>Register</span></Link></>}
          <Badge badgeContent={quantity} color="primary">
            <Link to='/cart'><ShoppingCartCheckoutOutlined className='cursor-pointer'/></Link>
          </Badge>
        </div>
      </nav>
  )
}

export default Navbar
