import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
const Order = () => {
  const [message, setMessage] = useState()
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("success");
    }else{
      setMessage(
        "failed"
      );
    }
  }, []);
  return (
    <div className='flex justify-center items-center h-[90vh]'>
      {!message && <h1 className='text-2xl text-center'>Please Wait...</h1>}
      {message === "success" ? <div className='text-center'>
        <i className="fa-solid fa-circle-check fa-beat fa-2xl"></i>
        <h1 className='text-2xl my-4'>Order placed successfully! You will receive an email confirmation. Thanks For Your Order</h1>
        <Link to='/'><button className='bg-black text-white font-medium text-sm p-2'>Go to Home</button></Link>
        </div> : <div className='text-center'>
        <i className="fa-solid fa-circle-xmark fa-flip fa-2xl"></i>
        <h1 className='text-2xl my-4'>Order canceled -- continue to shop around and checkout when you're ready.</h1>
        <Link to='/cart'><button className='bg-black text-white font-medium text-sm p-2'>Back to Cart</button></Link>
        </div>}
     </div>
  )
}

export default Order
