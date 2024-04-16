import { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { deleteProduct, getProducts } from '../../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ProductsList = () => {
  const {products} = useSelector(state=>state.product)
  const dispatch = useDispatch()
  const removeProduct = (e, id)=>{
    e.preventDefault()
    deleteProduct(dispatch, id)
  }
  useEffect(()=>{
    getProducts(dispatch)
  }, [])
  return (
    <div>
      <Navbar/>
      <section className='flex'>
        <Sidebar/>
      <div className="w-full mb-12 xl:mb-0 px-4 m-8">
      <div className='flex mb-4 justify-between'>
        <h2 className='text-4xl'>Products</h2>
        <Link to='/addProduct'><button className="hover:shadow-form rounded-md bg-[#6A64F1] py-2 px-4 text-center text-base font-semibold text-white outline-none"
              >
                Add Products
        </button></Link>
        </div>
        <div className="relative flex flex-col min-w-0 break-words bg-white mb-6 shadow-lg rounded ">
           <div className="block overflow-x-auto">
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
                <th className="px-3 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                Button
                                </th>
                </tr>
                </thead>

                <tbody>
                    {products?.map((item)=>(
                    <tr key={item._id}>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {item.title}
                    </td>
                    <td className="border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    <div style={{backgroundImage: `url(${item.image})`, backgroundPosition: "center", backgroundSize: "cover", width: "80px", height: "80px"}}></div>
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {item.size.map((item)=>(<span key={item}>{item} </span>))}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    {item.color.map((item)=>(<span key={item}>{item} </span>))}
                    </td>
                    <td className="font-medium border-t-0 px-3 align-center border-l-0 border-r-0 whitespace-nowrap p-4">
                    Rs. {item.price}
                    </td>
                    <td className="border-t-0 px-3 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                    <Link to={`/updateProduct/${item._id}`}><button className='bg-blue-500 rounded-md mr-2'><i className="fa-regular fa-pen-to-square p-2" style={{color: "#ffffff"}}></i></button></Link>
                    <button className='bg-red-500 rounded-md' onClick={(e)=>removeProduct(e, item._id)}><i className="fa-solid fa-trash p-2"  style={{color: "#ffffff"}}></i></button>
                    </td>
                </tr>
                    ))}
                </tbody>

            </table>
            </div>
        </div>
        </div>
        </section>
    </div>
  )
}

export default ProductsList
