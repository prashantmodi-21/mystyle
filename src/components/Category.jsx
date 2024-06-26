import React from 'react'
import { Link } from 'react-router-dom'
import category from "../data"
const Category = () => {
  return (
    <section id='category'>
    <div className='flex flex-col md:flex-row justify-center items-center my-20 mx-6'>
      {category.map((item)=>(
      <div key={item.id} style={{backgroundImage: `url("${item.img}")`, backgroundColor: "#0000004d", backgroundPosition: "center", backgroundSize: "cover", backgroundBlendMode: "darken"}} className={`flex justify-center items-center w-full md:w-[400px] h-[40vh] m-2`}>
        <div className='flex-1 absolute text-center'>
        <h2 className='text-4xl mb-4 text-white uppercase'>{item.name}</h2>
          <Link to={`/products/${item.name}`}><button className='px-2 py-1 border-2 border-white text-xs text-white'>SHOP NOW</button></Link>
        </div>
      </div>
      ))}
      
      {/* <div className='flex justify-center items-center bg-[url("img/cat-2.jpg")] bg-[#0000004d] bg-blend-darken bg-center bg-cover w-full md:w-[400px] h-[40vh] m-2'>
        <div className='flex-1 absolute text-center'>
        <h2 className='text-4xl mb-4 text-white uppercase'>Footwears</h2>
          <Link to='/products'><button className='px-2 py-1 border-2 border-white text-xs text-white'>SHOP NOW</button></Link>
        </div>
      </div>
      <div className='flex justify-center items-center bg-[url("img/cat-3.jpg")] bg-[#0000004d] bg-blend-darken bg-center bg-cover w-full md:w-[400px] h-[40vh] m-2'>
        <div className='flex-1 absolute text-center'>
        <h2 className='text-4xl mb-4 text-white uppercase'>Accessories</h2>
          <Link to='/products'><button className='px-2 py-1 border-2 border-white text-xs text-white'>SHOP NOW</button></Link>
        </div>
      </div> */}
    </div>
    </section>
  )
}

export default Category
