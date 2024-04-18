import React, { useEffect, useState } from 'react'
import Flyer from '../components/Flyer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addProducts, updateProducts } from '../redux/cartRedux'
import { publicRequest } from '../requestMethods'
import { addCartProducts, updateCartProducts } from '../redux/apiCalls'

const Product = () => {
  const {cart, user} = useSelector(state=>state)
  const [selectedProduct, setSelectedProduct] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  const [quantity, setQuantity] = useState(1)
  const {id} = useParams()
  const dispatch = useDispatch()
  const addToCart = ()=>{
    const cartProduct = cart.products.find(item=> item._id === selectedProduct._id)

    if(user.currentUser){
      if(cartProduct){
        updateCartProducts(dispatch, cartProduct._id, {...cartProduct, quantity: cartProduct.quantity + quantity})
      }else{
        addCartProducts(dispatch, selectedProduct._id, {...selectedProduct, quantity, size, color})
      }
    }
    else{
      if(cartProduct && cartProduct.color === color && cartProduct.size === size){
        dispatch(updateProducts({id: cartProduct._id, product: {...cartProduct, quantity: cartProduct?.quantity + quantity}}))
      }
      else{
        dispatch(addProducts({...selectedProduct, quantity, size, color}))
      }
    }
  }
  useEffect(()=>{
    (async()=>{
      const res = await publicRequest.get(`/api/product/${id}`)
      setSelectedProduct(res.data)
      setColor(res.data.color[0])
      setSize(res.data.size[0])
    })()
  }, [])
  return (
    <div>
      <Topbar/>
      <Navbar/>
      {selectedProduct && <section id='product'>
      <div className='flex flex-col md:flex-row m-10 lg:m-20'>
        <div className='md:mr-12'>
            <img src={selectedProduct.image} alt={selectedProduct.title} className='w-full h-[40vh] md:w-[400px] md:h-[400px] object-cover'/>
        </div>
        <div className='space-y-8 font-medium'>
            <h2 className='text-4xl'>{selectedProduct.title}</h2>
            <div className='flex justify-between items-center'>
                <select className='text-xs p-1 border-2 border-black' onChange={(e)=>setSize(e.target.value)}>
                  {selectedProduct.size.map((item)=>(
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <div className='space-x-2 flex'>
                  {selectedProduct.color.map((item)=>(<div key={item} className={`w-4 h-4 rounded-full border-black border-2`} style={{backgroundColor: item, opacity: .7}} onClick={()=>setColor(item)}></div>))}
                </div>
            </div>
            <div className='text-2xl'>Rs: {selectedProduct.price}</div>
            <div className='flex justify-between'>
            <div className='space-x-2 border-2 border-black p-1'>
                    <button disabled={quantity === 1 && true} onClick={()=>setQuantity(quantity-1)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={()=>setQuantity(quantity+1)}>+</button>
            </div>
            <button className='bg-blue-300 hover:bg-blue-400 border-2 border-black px-2 py-1 text-sm' onClick={()=>addToCart()}>ADD TO CART</button>
            </div>
            <div className='space-y-1'>
              <p className='font-normal'>{selectedProduct.desc}</p>
            </div>
        </div>
      </div>
      </section>}
      <Flyer/>
      <Footer/>
    </div>
  )
}

export default Product
