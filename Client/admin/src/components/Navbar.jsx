import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate = useNavigate()
  const {currentUser} = useSelector(state=>state.user)
  useEffect(()=>{
    !currentUser && navigate("/")
  }, [currentUser])
  return (
    <>
  <nav>
<div className="flex flex-wrap">
  <div className="w-full bg-white shadow-md shadow-blue-gray-900/5">
      <div className="sm:flex items-stretch justify-between grow lg:mb-0  py-5 px-5">
    <div className="flex flex-col flex-wrap justify-center mb-5 mr-3 lg:mb-0">
    <span className="my-0 flex text-dark text-[1.35rem]/[1.2] flex-col justify-center">
        MyStyle Admin
    </span>
    </div>
    <div className="flex items-center lg:shrink-0 lg:flex-nowrap">
    <div className="relative lg:hidden flex items-center sm:ml-2 ml-auto">
        <a className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary active:text-primary focus:text-primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
        </svg>
        </a>
    </div>
    
    <div className="relative flex items-center ml-2 lg:ml-4">
        <a className="flex items-center justify-center w-12 h-12 text-base font-medium leading-normal text-center align-middle transition-colors duration-150 ease-in-out bg-transparent border border-solid shadow-none cursor-pointer rounded-2xl text-stone-500 border-stone-200 hover:text-primary active:text-primary focus:text-primary">
        <i className="fa-regular fa-user"></i>
        </a>
    </div>
    </div>
</div>
  </div>
</div>
    </nav>
    </>
  )
}

export default Navbar
