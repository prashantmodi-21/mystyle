import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsers } from '../../redux/apiCalls'

const UsersForm = () => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const user = useSelector(state=>state.user.users.find(item=>item._id === id))
  const [selectedUser, setSelectedUser] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    isAdmin: false
  })
  const updateUser = (e) =>{
    e.preventDefault()
    updateUsers(dispatch, id, selectedUser)
  }
  useEffect(()=>{
    setSelectedUser({name: user.name, username: user.username, phone: user.phone, email: user.email, isAdmin: user.isAdmin})
  }, [])
  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <Sidebar/>
      <div className="w-full">
      <table className="bg-transparent w-full border-collapse ">
                <thead>
                <tr>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Name
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Username
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Email
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Phone
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                isAdmin
                                </th>
                
                </tr>
                </thead>

                <tbody>
                    <tr>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {user.name}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {user.username}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {user.email}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {user.phone}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {user.isAdmin ? "Yes" : "No"}
                    </td>
                </tr>
                </tbody>

            </table>
        <div className="w-full px-4">
          <h2 className='text-4xl py-8'>Update Users</h2>
          <form>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={selectedUser.name}
                    placeholder="Name"
                    onChange={(e)=>setSelectedUser({...selectedUser, [e.target.name]: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={selectedUser.username}
                    placeholder="Username"
                    onChange={(e)=>setSelectedUser({...selectedUser, [e.target.name]: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="phone"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={selectedUser.phone}
                    placeholder="Phone"
                    onChange={(e)=>setSelectedUser({...selectedUser, [e.target.name]: parseInt(e.target.value)})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={selectedUser.email}
                    placeholder="Email"
                    onChange={(e)=>setSelectedUser({...selectedUser, [e.target.name]: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                isAdmin
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isAdmin"
                    onChange={(e)=>setSelectedUser({...selectedUser, [e.target.name]: e.target.value})}
                    value={true}
                    id="radioButton1"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton1"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="isAdmin"
                    onChange={(e)=>setSelectedUser({...selectedUser, [e.target.name]: e.target.value})}
                    value={false}
                    id="radioButton2"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton2"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>

            <div>
              <button onClick={(e)=>updateUser(e)} className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}

export default UsersForm
