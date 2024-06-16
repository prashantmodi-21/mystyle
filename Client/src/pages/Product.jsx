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
  const {total} = cart
  const [selectedProduct, setSelectedProduct] = useState()
  const [color, setColor] = useState()
  const [size, setSize] = useState()
  const [qty, setQty] = useState(1)
  const {id} = useParams()
  const dispatch = useDispatch()
  const cartProduct = cart.products.find(item=> item.productId === selectedProduct?._id)
  const differProduct = cart.products.filter(item=> item.productId === selectedProduct?._id)
  const addToCart = ()=>{

    if(user.currentUser){
      if(differProduct.length > 0 && differProduct[differProduct.length -1].color === color && differProduct[differProduct.length -1].size === size){
        updateCartProducts(dispatch, cartProduct._id, differProduct.length -1, {...cartProduct, _id: cartProduct.productId, size: differProduct[differProduct.length - 1].size, qty: differProduct[differProduct.length - 1].qty + qty, total: total + cartProduct.price})
      }else if(cartProduct && cartProduct.size === size && cartProduct.color === color){
        updateCartProducts(dispatch, cartProduct._id, differProduct.length -1, {...cartProduct, productId: cartProduct.productId, size: differProduct[differProduct.length - 1].size, qty: differProduct[differProduct.length - 1].qty + qty, total: total + cartProduct.price})
      }else{
        addCartProducts(dispatch, selectedProduct._id, {...selectedProduct, productId: selectedProduct._id, qty, size, color, total: total + (qty * selectedProduct.price)})
      }
    }
    else{
      if(differProduct.length > 0 && differProduct[differProduct.length -1].color === color && differProduct[differProduct.length -1].size === size){
        dispatch(updateProducts({id: cartProduct.productId, index: cart.products.length - 1, product: {...cartProduct, productId: cartProduct.productId, size: differProduct[differProduct.length - 1].size, qty:  differProduct[differProduct.length -1]?.qty + qty}}))
      }else{
        dispatch(addProducts({...selectedProduct, productId: selectedProduct._id, qty, size, color}))
      }
    }
  }
  useEffect(()=>{
    (async()=>{
      const res = await publicRequest.get(`/api/product/${id}`)
      setSelectedProduct(res.data)
      setColor(res.data.color[0])
      setSize(cartProduct ? cartProduct.size : res.data.size[0])
    })()
  }, [])
  return (
    <div>
      <Topbar/>
      <Navbar/>
      {selectedProduct && <section id='product'>
      <div className='flex flex-col md:flex-row sm:m-10 lg:m-20'>
        <div className='md:mr-12'>
            <img src={selectedProduct.image} alt={selectedProduct.title} className='w-full h-[60vh] md:w-[400px] md:h-[400px] object-cover'/>
        </div>
        <div className='space-y-8 font-medium m-6 sm:m-0'>
            <h2 className='text-4xl'>{selectedProduct.title}</h2>
            <div className='flex justify-between items-center'>
                <select className='text-xs p-1 border-2 border-black' defaultValue={cartProduct?.size} onChange={(e)=>setSize(e.target.value)}>
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
                    <button disabled={cartProduct ? cartProduct.qty === 1 && true : qty === 1 && true} onClick={()=>setQty(cartProduct ? cartProduct.qty - 1: qty-1)}>-</button>
                    <span>{cartProduct ? cartProduct.qty : qty}</span>
                    <button onClick={()=>setQty(cartProduct ? cartProduct.qty + 1: qty+1)}>+</button>
            </div>
            <button className='bg-blue-300 hover:bg-blue-400 border-2 border-black px-2 py-1 text-sm' onClick={()=>addToCart()}>ADD TO CART</button>
            </div>
            <div className='space-y-1'>
              <p className='font-normal text-sm'>{selectedProduct.desc}</p>
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
