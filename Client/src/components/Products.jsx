import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "./ProductCard"

const Products = ({filterCategory, sortValue}) => {
  const {category} = useParams()
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])
  useEffect(()=>{
    (async()=>{
      if(filterCategory){
        const res = await axios.get("http://localhost:3000/api/product")
        setFilterProducts(res.data.filter(item=> Object.entries(filterCategory).every(([key,value])=> item[key].includes(value))))
      }else{
        const res = await axios.get(category ? `http://localhost:3000/api/product?filter=${category}`: "http://localhost:3000/api/product")
        setProducts(res.data)
      }
      })()
  }, [filterCategory])

  useEffect(()=>{
    if(sortValue === "asc"){
      setProducts((prev)=> [...prev].sort((a,b)=> a.price - b.price))
    }else if(sortValue === "desc"){
      setProducts((prev)=> [...prev].sort((a,b)=> b.price - a.price))
    }else if(sortValue === "new"){
      setProducts((prev)=> [...prev].sort((a,b)=> b.createdAt.localeCompare(a.createdAt)))
    }else{
      setProducts((prev)=> [...prev].sort((a,b)=> a.createdAt.localeCompare(b.createdAt)))
    }
  },[sortValue])
  return (
    <section id='products-items'>
    <div className='flex justify-center flex-wrap'>
      {filterProducts.length > 0 ? filterProducts.map((item)=>(
        <ProductCard key={item._id} item={item}/>
      )) : products.map((item)=>(
        <ProductCard key={item._id} item={item}/>
      ))}
      
    </div>
    </section>
  )
}

export default Products
