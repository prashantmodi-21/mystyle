import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({item}) => {
  return (
    <Link key={item.id} to={`/product/${item._id}`}>
        <div style={{backgroundImage: `url("${item.image}")`, backgroundColor: "#0000004d", backgroundPosition: "center", backgroundSize: "cover"}} className={`w-[90vw] sm:w-[250px] h-[250px] transition-all hover:scale-110 bg-blend-darken hover:bg-blend-normal m-4 flex justify-center items-center`}>
        <div className='absolute'>
            <i className='fa-regular fa-heart rounded-full bg-white mx-1 p-2 cursor-pointer hover:scale-125 duration-300'></i>
            <i className='fa-solid fa-cart-plus rounded-full bg-white mx-1 p-2 cursor-pointer hover:scale-125 duration-300'></i>
        </div>
        </div>
      </Link>
  )
}

export default ProductCard
