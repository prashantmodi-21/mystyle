import React, { useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
const Slider = () => {
  const [value, setValue] = useState(0)
  const slide = (e) =>{
    if(e === "left"){
      setValue(value > 0 ? value-1  : 2)
    }else{
      setValue(value < 2 ? value+1  : 0)
    }
  }
  setTimeout(() => {
    slide("right")
  }, 2000);
  return (
    <section id='slider' className='overflow-hidden'>
      <div className='absolute h-full w-full flex justify-between items-center z-30'>
            <div className='bg-white rounded-full w-12 h-12 flex justify-center items-center mx-4 opacity-50 cursor-pointer' >
              <ArrowLeftIcon onClick={()=>{slide("left")}}/>
            </div>
            <div className='bg-white rounded-full w-12 h-12 flex justify-center items-center mx-4 opacity-50 cursor-pointer'>
              <ArrowRightIcon onClick={()=>{slide("right")}}/>
            </div>
        </div>
      <div style={{transform: `translateX(${(value * -100)}vw)`, position: "relative", height: "90vh"}} className='transition-all'>
        
        <div className={`flex h-full`}>
          <div className='bg-[url("img/bg-1.jpg")] bg-[#0000004d] w-auto bg-blend-darken bg-cover'>
            <div className='w-screen h-full flex justify-center sm:justify-end sm:pr-16 items-center'>
              <div className='text-center sm:text-left'>
                <h1 className='text-3xl sm:text-5xl text-white'>Latest Brand Collection</h1>
                <p className='uppercase text-xs sm:text-sm my-4 tracking-widest text-white'>We Offer Brands Latest Collection At an Affordable Price</p>
                <button className='uppercase p-2 border-2 border-white text-xs sm:text-sm text-white'>Buy Now</button>
                </div>
            </div>
          </div>
          <div className='bg-[url("img/bg-2.jpg")] bg-[#0000004d] w-auto bg-blend-darken bg-cover'>
            <div className='w-screen h-full flex justify-center sm:justify-end sm:pr-16 items-center'>
              <div className='text-center sm:text-left'>
                <h1 className='text-3xl sm:text-5xl text-white'>Best of Formal Wear</h1>
                <p className='uppercase text-xs sm:text-sm my-4 tracking-widest text-white'>We Offer Brands Latest Collection At an Affordable Price</p>
                <button className='uppercase p-2 border-2 border-white text-xs sm:text-sm text-white'>Buy Now</button>
                </div>
            </div>
          </div>
          <div className='bg-[url("img/bg-3.jpg")] bg-[#0000004d] w-auto bg-blend-darken bg-cover'>
            <div className='w-screen h-full flex justify-center sm:justify-end sm:pr-16 items-center'>
              <div className='text-center sm:text-left'>
                <h1 className='text-3xl sm:text-5xl text-white'>Accessories that Enhances Your Lifestyle</h1>
                <p className='uppercase text-xs sm:text-sm my-4 tracking-widest text-white'>We Offer Brands Latest Collection At an Affordable Price</p>
                <button className='uppercase p-2 border-2 border-white text-xs sm:text-sm text-white'>Buy Now</button>
                </div>
            </div>
          </div>
          </div>
      </div>
      </section>
  )
}

export default Slider
