import React, { useEffect, useState } from 'react'
import { userRequest} from '../requestMethods'
const Cards = () => {
  const [ordLen, setOrdLen] = useState(0)
  const [prodLen, setProdLen] = useState(0)
  const [userLen, setUserLen] = useState(0)
  useEffect(()=>{
      (async()=>{
        const orders = await userRequest.get('api/order/all')
        setOrdLen(orders.data.length)
  
        const products = await userRequest.get('api/product/')
        setProdLen(products.data.length)
  
        const users = await userRequest.get('api/user/')
        setUserLen(users.data.length)
  
      })()
  }, [])
  return (
    <div className='flex flex-wrap justify-center items-center mt-8'>
      <div className='h-[15vh] rounded-xl flex flex-col justify-center items-center font-semibold m-4 p-4 bg-red-400'>
        <p className='text-white'>No. of Orders Received</p>
        <h3 className='text-3xl text-white'>{ordLen}</h3>
      </div>
      <div className='h-[15vh] rounded-xl flex flex-col justify-center items-center font-semibold m-4 p-4 bg-green-400'>
        <p className='text-white'>No. of Products Listed</p>
        <h3 className='text-3xl text-white'>{prodLen}</h3>
      </div>
      <div className='h-[15vh] rounded-xl flex flex-col justify-center items-center font-semibold m-4 p-4 bg-blue-400'>
        <p className='text-white'>No. of Categories</p>
        <h3 className='text-3xl text-white'>3</h3>
      </div>
      <div className='h-[15vh] rounded-xl flex flex-col justify-center items-center font-semibold m-4 p-4 bg-orange-400'>
        <p className='text-white'>No. of Users Registered</p>
        <h3 className='text-3xl text-white'>{userLen}</h3>
      </div>
    </div>
  )
}

export default Cards
