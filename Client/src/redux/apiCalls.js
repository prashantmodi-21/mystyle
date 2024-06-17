import { publicRequest, userRequest } from "../requestMethods"
import { addProducts, cleanCart, deleteProducts, getProducts, updateProducts } from "./cartRedux"
import { addUserError, addUserStart, addUserSuccess, loginError, loginStart, loginSuccess } from "./userRedux"

// USER LOGIN

export const userLogin = async(dispatch, user) =>{
    dispatch(loginStart())
    try {
      const res = await publicRequest.post("/api/auth/login", user)
      dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(loginError())
    }
}

// ADD NEW USER

export const addUser = async(dispatch, user) =>{
    dispatch(addUserStart())
    try {
      const res = await publicRequest.post("/api/auth/register", user)
      dispatch(addUserSuccess(res.data))
    } catch (error) {
      dispatch(addUserError())
    }
}

// ADD CART PRODUCTS

export const addCartProducts = async(dispatch, id, products) =>{
    try {
      const res = await userRequest.post(`/api/cart/${id}`, products)
      dispatch(addProducts(res.data.products[res.data.products.length - 1]))
    } catch (error) {
      console.log(error)
    }
}

// UPDATE CART PRODUCTS

export const updateCartProducts = async(dispatch, id, index, product) =>{
    try {
      const res = await userRequest.put(`/api/cart/${id}`, product)
      dispatch(updateProducts({id, index, product: res.data.products[res.data.products.length -1]}))
    } catch (error) {
      console.log(error)
    }
}

// DELETE CART PRODUCTS

export const deleteCartProducts = async(dispatch, product, index) =>{
  console.log(product)
    try {
      const res = await userRequest.put(`/api/cart/delete/${product.item._id}`, product)
      dispatch(deleteProducts({_id: product.item._id, price: product.item.price, index}))
    } catch (error) {
      console.log(error)
    }
}

// ADD PRODUCTS TO USER CART

export const addMultipleProducts = async(products)=>{
  try {
    const res = await userRequest.post(`/api/cart/`, products)
  } catch (error) {
    console.log(error)
  }
}

// GET USER CART PRODUCTS

export const getCartProducts = async(dispatch)=>{
  try {
    const res = await userRequest.get("/api/cart/")
    res.data[0] && dispatch(getProducts(res.data[0]))
  } catch (error) {
    console.log(error)
  }
}

// CLEAN USER CART

export const cleanUserCart = async(dispatch)=>{
  try {
    await userRequest.delete("/api/cart/")
    dispatch(cleanCart())
  } catch (error) {
    console.log(error)
  }
}