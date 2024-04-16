import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { Link } from 'react-router-dom'
import { deleteOrder, getOrder } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'

const OrderList = () => {
  const {orders} = useSelector(state=>state.order)
  const dispatch = useDispatch()
  useEffect(()=>{
    getOrder(dispatch)
  }, [])
  return (
    <div>
      <Navbar/>
      <section className='flex'>
        <Sidebar/>
      <div className="w-4/5 mb-12 xl:mb-0 m-8">
        <h2 className='text-4xl mb-4'>Orders</h2>
        <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded">
            

            <div className="block overflow-x-auto">
            <table className="items-center bg-transparent border-collapse">
                <thead>
                <tr>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Customer Name
                                </th>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Customer Phone
                                </th>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Customer Address
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Item Title & Size
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Item Qty
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Amount
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Status
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Button
                                </th>
                </tr>
                </thead>

                <tbody>
                    {orders?.map((item)=>(
                    <tr key={item._id}>
                    <td className="font-medium border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
                    {item.name}
                    </td>
                    <td className="font-medium border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
                    {item.phone}
                    </td>
                    <td className="font-medium border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
                    <div>{item.address.line1}</div><div>{item.address.line2}</div><div>{item.address.city}</div><div>{item.address.country}</div><div>{item.address.postal_code}</div>
                    </td>
                    <td className="font-medium border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
                    {item.orders.map((item)=>(<div key={item.desc}>{item.desc}</div>))}
                    </td>
                    <td className="font-medium border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap p-4 ">
                    {item.orders.map((item)=>(item.qty + " "))}
                    </td>
                    <td className="font-medium border-t-0 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {item.amount}
                    </td>
                    <td className="font-medium border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    <span className='p-2 bg-indigo-200 rounded-md'>{item.status}</span>
                    </td>
                    <td className="font-medium border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    <Link to={`/updateOrder/${item._id}`}><button className='bg-blue-500 rounded-md mr-2'><i className="fa-regular fa-pen-to-square p-2" style={{color: "#ffffff"}}></i></button></Link>
                    <button className='bg-red-500 rounded-md' onClick={()=>deleteOrder(dispatch, item._id)}><i className="fa-solid fa-trash p-2"  style={{color: "#ffffff"}}></i></button>
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

export default OrderList
