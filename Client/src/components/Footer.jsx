import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
    <div className='bg-gray-900 text-white text-sm font-medium'>
      <div className='flex flex-col items-center md:flex-row md:justify-between p-10 md:p-20 space-y-8 md:space-y-0'>
      <div className='text-center md:text-left'>
        <h2 className='text-2xl'>MyStyle</h2>
        <p className='my-2'>A Fashion Store for Mens. Branded Clothes , Footwears, Accessories and more</p>
        <div className='flex justify-center md:justify-start space-x-2'>
            <i className='fa-brands fa-facebook'></i>
            <i className='fa-brands fa-instagram'></i>
            <i className='fa-brands fa-pinterest'></i>
        </div>
      </div>
      <div className='flex flex-col items-center md:flex-row justify-around w-full list-none space-y-4 md:space-y-0'>
        <div className='space-y-4 text-center'>
          <h4 className='text-2xl'>Useful Links</h4>
            <li><Link to='/'><span className='decoration-none'>Home</span></Link></li>
            <li><Link to='/'><span className='decoration-none'>About</span></Link></li>
            <li><Link to='/'><span className='decoration-none'>Contact</span></Link></li>
          </div>
        <div className='space-y-4 text-center'>
        <h4 className='text-2xl'>Category</h4>
        <li><Link to='/products/clothes'><span className='decoration-none'>Clothes</span></Link></li>
        <li><Link to='/products/footwear'><span className='decoration-none'>Footwears</span></Link></li>
        <li><Link to='/products/accessories'><span className='decoration-none'>Accessories</span></Link></li>
        </div>
      <div className='space-y-4 text-center'>
        <h2 className='text-2xl'>Contact</h2>
          <div>Phone: 0120 123456</div>
          <div>Mail: info@mystyle.co.in</div>
          <address>Address: Xyz Street, Abc City</address>
      </div>
      </div>
      </div>
      <div className='pb-2 text-center'>Copyright &copy; {new Date().getFullYear()}. All Rights Reserved</div>
    </div>
    </footer>
  )
}

export default Footer
