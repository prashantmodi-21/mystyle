import { publicRequest, userRequest } from "../requestMethods"
import { addProducts, deleteProducts, updateProducts } from "./cartRedux"
import { addUserError, addUserStart, addUserSuccess, loginError, loginStart, loginSuccess } from "./userRedux"

export const userLogin = async(dispatch, user) =>{
    dispatch(loginStart())
    try {
      const res = await publicRequest.post("/api/auth/login", user)
      dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(loginError())
    }
}
export const addUser = async(dispatch, user) =>{
    dispatch(addUserStart())
    try {
      const res = await publicRequest.post("/api/auth/register", user)
      dispatch(addUserSuccess(res.data))
    } catch (error) {
      dispatch(addUserError())
    }
}
export const addCartProducts = async(dispatch, id, products) =>{
    try {
      const res = await userRequest.post(`/api/cart/${id}`, products)
      dispatch(addProducts(products))
    } catch (error) {
      console.log(error)
    }
}
export const updateCartProducts = async(dispatch, id, product, index) =>{
    try {
      const res = await userRequest.put(`/api/cart/${id}`, product)
      dispatch(updateProducts({id, product}))
    } catch (error) {
      console.log(error)
    }
}
export const deleteCartProducts = async(dispatch, product) =>{
    try {
      const res = await userRequest.delete(`/api/cart/${product._id}`)
      dispatch(deleteProducts(product))
    } catch (error) {
      console.log(error)
    }
}

export const addMultipleProducts = async(products)=>{
  try {
    const res = await userRequest.post(`/api/cart/`, products)
  } catch (error) {
    console.log(error)
  }
}