import React, { useEffect, useState } from 'react'
import Flyer from '../components/Flyer'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProducts, productsDec, productsInc, updateProducts } from '../redux/cartRedux'
import { deleteCartProducts, updateCartProducts } from '../redux/apiCalls'
import { publicRequest } from '../requestMethods'

const Cart = () => {
  const dispatch = useDispatch()
  const [cartProducts, setCartProducts] = useState([])
  const {currentUser} = useSelector(state=>state.user)
  const {products, total} = useSelector(state=>state.cart)
  const handleCheckout = async() =>{
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/checkout/payment`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({items: 
          products.map((item)=>({
            qty: item.quantity,
            amount: item.price,
            desc: item.title + ", " + item.size,
          }))
        })
      })
      const data = await res.json()
      location.assign = data.url
    } catch (error) {
      console.log(error)
    }
  } 
  useEffect(()=>{
    (async()=>{
      const {data} = await publicRequest.get("/api/product")
      const cartProducts = data.filter((item)=> products.find((cartItem)=> item._id === cartItem._id))
      setCartProducts(cartProducts)
    })()
  }, [products, currentUser])
  return (
    <div>
      <Topbar />
      <Navbar />
      <section id='cart'>
        <h1 className='text-4xl text-center p-20'>Your Cart</h1>
        <div className='flex flex-col md:flex-row items-center m-5 sm:m-10'>
          <div className='w-full md:w-3/4'>
            <div className='flex border-t border-b text-sm font-medium justify-around p-2'>
              <div>Product Image</div>
              <div>Product Title</div>
              <div>Qty</div>
              <div>Size</div>
              <div>Color</div>
              <div>Price</div>
            </div>
            {products.length > 0 && products.map((item, index)=>(
            <div className='flex border-b text-sm justify-around items-center py-10' key={index}>
              <div><img src={item.image} alt={item.title} className='w-24 h-24 sm:w-32 sm:h-32 object-cover' /></div>
              <div className='font-semibold'>{item.title}</div>
              <div className='space-x-2 border-2 border-black p-1'>
                <button onClick={()=>currentUser ? products[index].quantity === 1 ? deleteCartProducts(dispatch, item) : updateCartProducts(dispatch, item._id, {...item, quantity: products[index]?.quantity - 1, color: products[index].color, size: products[index].size}) : products[index].quantity === 1 ? dispatch(deleteProducts({...item, index})) : dispatch(productsDec({id: item._id, product:{...item, quantity: products[index]?.quantity - 1, size: products[index].size, color: products[index].color}}))}>-</button>
                <span>{products[index]?.quantity}</span>
                <button onClick={()=>currentUser ? updateCartProducts(dispatch, item._id, {...item, quantity: products[index]?.quantity + 1, color: products[index].color, size: products[index].size}) :  dispatch(productsInc({id: item._id, product:{...item, quantity: products[index]?.quantity + 1, size: products[index].size, color: products[index].color}}))}>+</button>
              </div>
              <div>
                <select className='text-sm p-1 border-black border-2' onChange={(e)=> currentUser ? updateCartProducts(dispatch, item._id, {...item, quantity: products[index]?.quantity, color: products[index].color, size: e.target.value}):  dispatch(updateProducts({id: item._id, product: {...item, size: e.target.value, quantity: products[index].quantity, color: products[index].color, index}}))} value={item.size}>
                  {cartProducts.find((product)=>product._id === item._id)?.size.map((size)=>(<option key={size} value={size}>{size}</option>))}
                </select>
              </div>
                <div className='flex space-x-2' onChange={(e)=>setColor(e.target.value)}>
                  {cartProducts.find((product)=>product._id === item._id)?.color.map((color)=>(<div key={color} className={products[index]?.color === color && 'border-2 border-black'} style={{width: "20px", height: "20px", backgroundColor: color, opacity: .7, borderRadius: "50%"}} onClick={(e)=> currentUser ? updateCartProducts(item._id, {...item, quantity: products[index]?.quantity, color: color, size: products[index].size}):  dispatch(updateProducts({id: item._id, product: {...item, color, quantity: products[index].quantity, size: products[index].size}}))}></div>))}
                </div>
              <div className='font-semibold'>Rs: { item.price * products[index]?.quantity}</div>
            </div>
            ))}
            <div className='mt-4 hidden md:flex justify-between'>
              <Link to='/'><button className='bg-gray-200 text-sm font-medium p-1 border-2 border-black'>Back to Home</button></Link>
              {currentUser ?  <Link><button className='bg-slate-200 text-sm font-medium p-1 border-2 border-black' onClick={handleCheckout}>Checkout</button></Link> : <Link to="/login"><button className='bg-slate-200 text-sm font-medium p-1 border-2 border-black'>Checkout</button></Link>}
            </div>
          </div>
          <aside className='ml-8 mt-4 w-full md:w-1/4 text-center'>
            <h4 className='text-3xl mb-4'>Order Total</h4>
            {cartProducts?.length > 0 ?<div className='text-sm space-y-4'>
              <div className='flex justify-between font-semibold'>
                <h3>MRP</h3>
                <span>Rs. {total+50}</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <h3>Price</h3>
                <span>Rs. {total}</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <h3>Discount</h3>
                <span>Rs. 50</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <h3>Shipping</h3>
                <span>Rs. 50</span>
              </div>
              <div className='border-t flex justify-between font-semibold'>
                <h3>Total</h3>
                <span>Rs. {total}</span>
              </div>
            </div>:
            <div className='text-sm space-y-4'>
            <div className='flex justify-between font-semibold'>
              <h3>MRP</h3>
              <span>Rs. 0</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <h3>Price</h3>
              <span>Rs. 0</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <h3>Discount</h3>
              <span>Rs. 0</span>
            </div>
            <div className='flex justify-between font-semibold'>
              <h3>Shipping</h3>
              <span>Rs. 0</span>
            </div>
            <div className='border-t flex justify-between font-semibold'>
              <h3>Total</h3>
              <span>Rs. 0</span>
            </div>
          </div>}
            <div className='mt-4 md:hidden flex justify-between'>
              <Link to='/'><button className='bg-gray-200 text-sm font-medium p-1 border-2 border-black'>Back to Home</button></Link>
              <Link><button className='bg-slate-200 text-sm font-medium p-1 border-2 border-black' onClick={handleCheckout}>Checkout</button></Link>
            </div>
          </aside>
        </div>
      </section>
      <Flyer />
      <Footer />
    </div>
  )
}

export default Cart
