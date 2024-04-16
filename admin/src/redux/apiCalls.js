import { publicRequest, userRequest } from "../requestMethods"
import { deleteUsersError, deleteUsersStart, deleteUsersSuccess, getUsersError, getUsersStart, getUsersSuccess, loginError, loginStart, loginSuccess, updateUsersError, updateUsersStart, updateUsersSuccess } from "./userRedux"
import { productStart, productSuccess, productError, deleteProductStart, deleteProductSuccess, deleteProductError, updateProductStart, updateProductSuccess, updateProductError, addProductStart, addProductSuccess, addProductError } from "./productRedux"
import { deleteOrdersError, deleteOrdersStart, deleteOrdersSuccess, getOrdersError, getOrdersStart, getOrdersSuccess, updateOrdersError, updateOrdersStart, updateOrdersSuccess } from "./orderRedux"

export const adminLogin = async(dispatch, user) =>{
    dispatch(loginStart())
    try {
      const res = await publicRequest.post("/api/auth/admin", {username: user.username, password: user.password})
      dispatch(loginSuccess(res.data))
    } catch (error) {
      dispatch(loginError())
    }
}

export const getProducts = async(dispatch)=>{
  dispatch(productStart())
    try {
      const res = await userRequest.get("/api/product/all")
      dispatch(productSuccess(res.data))
    } catch (error) {
      dispatch(productError())
    }
}
export const deleteProduct = async(dispatch, id)=>{
  dispatch(deleteProductStart())
    try {
      const res = await userRequest.delete(`/api/product/${id}`)
      dispatch(deleteProductSuccess(id))
    } catch (error) {
      dispatch(deleteProductError())
    }
}
export const updateProduct = async(dispatch, id, product)=>{
  dispatch(updateProductStart())
    try {
      const res = await userRequest.put(`/api/product/${id}`, product)
      dispatch(updateProductSuccess({id, product: res.data}))
    } catch (error) {
      dispatch(updateProductError())
    }
}
export const addProduct = async(dispatch, product)=>{
  dispatch(addProductStart())
    try {
      const res = await userRequest.post(`/api/product/`, product)
      dispatch(addProductSuccess(res.data))
    } catch (error) {
      dispatch(addProductError())
    }
}
export const getUsers = async(dispatch)=>{
  dispatch(getUsersStart())
    try {
      const res = await userRequest.get(`/api/user/`)
      dispatch(getUsersSuccess(res.data))
    } catch (error) {
      dispatch(getUsersError())
    }
}
export const deleteUsers = async(dispatch, id)=>{
  dispatch(deleteUsersStart())
    try {
      const res = await userRequest.delete(`/api/user/${id}`)
      dispatch(deleteUsersSuccess({id}))
    } catch (error) {
      dispatch(deleteUsersError())
    }
}
export const updateUsers = async(dispatch, id, user)=>{
  dispatch(updateUsersStart())
    try {
      const res = await userRequest.put(`/api/user/${id}`, user)
      dispatch(updateUsersSuccess({id, user: res.data}))
    } catch (error) {
      dispatch(updateUsersError())
    }
}
export const getOrder = async(dispatch)=>{
  dispatch(getOrdersStart())
    try {
      const res = await userRequest.get(`/api/order/all`)
      dispatch(getOrdersSuccess(res.data))
    } catch (error) {
      dispatch(getOrdersError())
    }
}
export const deleteOrder = async(dispatch, id)=>{
  dispatch(deleteOrdersStart())
    try {
      const res = await userRequest.delete(`/api/order/admin/${id}`)
      dispatch(deleteOrdersSuccess({id}))
    } catch (error) {
      dispatch(deleteOrdersError())
    }
}
export const updateOrders = async(dispatch, id, order)=>{
  dispatch(updateOrdersStart())
    try {
      const res = await userRequest.put(`/api/order/admin/${id}`, order)
      dispatch(updateOrdersSuccess({id, order: res.data}))
    } catch (error) {
      dispatch(updateOrdersError())
    }
}