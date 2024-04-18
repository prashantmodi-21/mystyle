import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'
import { deleteUsers, getUsers } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const UsersList = () => {
  const dispatch = useDispatch()
  const {users} = useSelector(state=>state.user)
  useEffect(()=>{
    getUsers(dispatch)
  }, [])
  return (
    <div>
        <Navbar/>
        <section className='flex'>
        <Sidebar/>
      <div className="w-full mb-12 xl:mb-0 px-4 m-8">
        <h2 className='text-4xl mb-4'>Users</h2>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
           <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                <tr>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                User Name
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Name
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Email
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Phone
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                IsAdmin
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Buttons
                                </th>
                </tr>
                </thead>

                <tbody>
                    {users?.map((item)=>(
                <tr key={item._id} className='font-medium'>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
                    {item.username}
                    </td>
                    <td className="border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {item.name}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
                    {item.email}
                    </td>
                    <td className="border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {item.phone}
                    </td>
                    <td className="border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {item.isAdmin ? "Yes" : "No"}
                    </td>
                    <td className="border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    <Link to={`/updateUser/${item._id}`}><button className='bg-blue-500 rounded-md mr-2'><i className="fa-regular fa-pen-to-square p-2" style={{color: "#ffffff"}}></i></button></Link>
                    <button className='bg-red-500 rounded-md' onClick={()=>deleteUsers(dispatch, item._id)}><i className="fa-solid fa-trash p-2"  style={{color: "#ffffff"}}></i></button>
                    </td>
                </tr>
                    ))}
                </tbody>

            </table>
            </div>
        </div>
        </div>
        </section>
    </div>
  )
}

export default UsersList
