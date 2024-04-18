import React, { useEffect, useRef } from 'react'
import Category from '../components/Category'
import Flyer from '../components/Flyer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Slider from '../components/Slider'
import Topbar from '../components/Topbar'
import { useSelector } from 'react-redux'
import { addMultipleProducts } from '../redux/apiCalls'

const Home = () => {
  const initialized = useRef(false)
  const {currentUser} = useSelector(state=>state.user)
  const {products} = useSelector(state=>state.cart)
  useEffect(()=>{
    if(!initialized.current){
      initialized.current = true
      currentUser && products.length > 0 && addMultipleProducts(products)
    }
  }, [currentUser])
  return (
    <>
      <Topbar/>
      <Navbar/>
      <Slider/>
      <Category/>
      <Products/>
      <Flyer/>
      <Footer/>
    </>
  )
}

export default Home
