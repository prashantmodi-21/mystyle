import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProduct } from '../../redux/apiCalls';

const ProductsForm = () => {
  const dispatch = useDispatch()
  const [fields, setFields] = useState({
    title: '',
    desc: '',
    price: '',
    inStock: ''
  })
  const [file, setFile] = useState({})
  const [category, setCategory] = useState([])
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
  const {id} = useParams()
  const product = useSelector(state=>state.product.products.find((item)=> item._id === id))
  const handleProduct = (e) =>{
    e.preventDefault()
    const fileName = new Date().getTime() + file.name
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.log(error)
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateProduct(dispatch, id, {...fields, category, size, color, image: downloadURL});
        });        
      }
    );    
  }
  useEffect(()=>{
    setFields({title: product.title, desc: product.desc, price: product.price, inStock: product.inStock})
    setCategory(product.category)
    setSize(product.size)
    setColor(product.color)
  }, [])
  return (
    <div>
      <Navbar/>
      <div className='flex'>
      <Sidebar/>
      <div className='flex flex-col items-center w-full'>
      <table className="bg-transparent w-full border-collapse ">
                <thead>
                <tr>
                    <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Title
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Image
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Sizes
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Colors
                                </th>
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Price
                                </th>
                
                </tr>
                </thead>

                <tbody>
                    <tr>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {product.title}
                    </td>
                    <td className="border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    <img src={product.image} alt={product.title} style={{width: "80px"}}/>
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {product.size.map((item)=>(<span key={item}>{item} </span>))}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {product.color.map((item)=>(<span key={item}>{item} </span>))}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    Rs. {product.price}
                    </td>
                    
                </tr>
                </tbody>

            </table>
      <div className="flex p-12 w-full">
        <div className="mx-auto w-full">
          <h2 className='text-4xl py-8'>Update Products</h2>
          <form >
              <div className="w-full ">
                <div className="mb-5">
                  <label
                    htmlFor="title"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={fields.title}
                    id="title"
                    placeholder="Product Title"
                    onChange={(e)=>setFields({...fields, [e.target.name]: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full ">
                <div className="mb-5">
                  <label
                    htmlFor="image"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Product Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    onChange={(e)=>setFile(e.target.files[0])}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Product Description
                  </label>
                  <textarea
                    type="text"
                    name="desc"
                    value={fields.desc}
                    id="desc"
                    placeholder="Product Description"
                    onChange={(e)=>setFields({...fields, [e.target.name]: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="category"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={category}
                    id="category"
                    placeholder="Category"
                    onChange={(e)=>setCategory(e.target.value.split(","))}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="size"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Size
                  </label>
                  <input
                    type="text"
                    name="size"
                    value={size}
                    id="size"
                    placeholder="Size"
                    onChange={(e)=>setSize(e.target.value.split(","))}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="-mx-3 flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="color"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={color}
                    id="color"
                    placeholder="Color"
                    onChange={(e)=>setColor(e.target.value.split(","))}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:w-1/2">
                <div className="mb-5">
                  <label
                    htmlFor="price"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={fields.price}
                    id="price"
                    placeholder="Price"
                    onChange={(e)=>setFields({...fields, [e.target.name]: e.target.value})}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="mb-3 block text-base font-medium text-[#07074D]">
                inStock
              </label>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="inStock"
                    onChange={(e)=>setFields({...fields, [e.target.name]: e.target.value})}
                    value={true}
                    id="radioButton1"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton1"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    Yes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="inStock"
                    onChange={(e)=>setFields({...fields, [e.target.name]: e.target.value})}
                    value={false}
                    id="radioButton2"
                    className="h-5 w-5"
                  />
                  <label
                    htmlFor="radioButton2"
                    className="pl-3 text-base font-medium text-[#07074D]"
                  >
                    No
                  </label>
                </div>
              </div>
            </div>
            

            <div>
              <button onClick={(e)=>handleProduct(e)}
                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default ProductsForm
