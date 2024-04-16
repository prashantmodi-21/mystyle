import React from 'react'
import { Link } from 'react-router-dom'

const Flyer = () => {
  return (
    <section id='flyer'>
    <div className='flex flex-col text-center md:text-left md:flex-row md:justify-between items-center pt-10 pb-10 md:p-20 bg-blue-100 my-8'>
      <h2 className='text-3xl md:text-4xl text-slate-700 mb-4 md:mb-0'>Grab Best Deals on Branded Clothings.<p className='mt-2'> Get Amazing Discounts</p></h2>
      <Link to='/products'><button className='px-2 py-1 uppercase border-2 border-slate-700 text-xs md:text-sm text-slate-700'>Shop Now</button></Link>
    </div>
    </section>
  )
}

export default Flyer
