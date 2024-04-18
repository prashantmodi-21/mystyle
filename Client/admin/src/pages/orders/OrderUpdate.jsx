import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrders } from '../../redux/apiCalls'

const OrderUpdate = () => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState()
  const {id} = useParams()
  const order = useSelector(state=>state.order.orders.find(item=>item._id === id))
  const updateOrder = (e) =>{
    e.preventDefault()
    updateOrders(dispatch, id, {status})
  }
  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <Sidebar/>
      <div className="flex p-12 w-full">
        <div className="mx-auto max-w-[1050px] min-w-[550px]">
          <h2 className='text-4xl py-8'>Update Order</h2>
          <form>
              <div className="w-full">
                <div className="mb-5">
                  <label
                    htmlFor="status"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Current Status
                  </label>
                  <select
                    type="text"
                    name="status"
                    id="status"
                    onChange={(e)=>setStatus(e.target.value)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value={order.status}>{order.status}</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            <div>
              <button onClick={(e)=>updateOrder(e)}
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
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

export default OrderUpdate
