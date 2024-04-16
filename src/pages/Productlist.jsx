import React, { useEffect, useState } from 'react'
import Flyer from '../components/Flyer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Topbar from '../components/Topbar'
import { useParams } from 'react-router-dom'
const Productlist = () => {
  const {category} = useParams()
  const [filterCategory, setFilterCategory] = useState()
  const [sortValue, setSortValue] = useState()
  const handleCategory = (e)=>{
    const {value} = e.target
    setFilterCategory({[e.target.name]: value})
  }
  return (
    <div>
      <Topbar/>
      <Navbar/>
      <section id='product-list'>
        <h2 className='text-4xl mx-20 mt-4'>{category && category.slice(0, 1).toUpperCase()+category.substring(1)}</h2>
        <div className='flex justify-between mx-10 sm:mx-20 my-8'>
            <div className='flex'><h3 className='text-2xl mr-2'>Sort :</h3><select className='text-xs p-1 border-2 border-black' onChange={(e)=>setSortValue(e.target.value)}>
                <option>--Select--</option>
                <option value="asc">Price Low to High</option>
                <option value="desc">Price High to Low</option>
                <option value="new">Newest First</option>
            </select></div>
            <div className='space-x-2'>
            <div className='flex'><h3 className='text-2xl mr-2'>Filter :</h3><select className='text-xs p-1 border-2 border-black' name='category' onChange={(e)=>handleCategory(e)}>
                <option>--Select--</option>
                <option value="tshirt">T-Shirt</option>
                <option value="shirt">Shirt</option>
                <option value="shoes">Shoes</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="backpacks">Backpacks</option>
                <option value="jackets">Jackets</option>
            </select></div>
            </div>
        </div>
        <Products filterCategory={filterCategory} sortValue={sortValue}/>
      </section>
      <Flyer/>
      <Footer/>
    </div>
  )
}

export default Productlist
