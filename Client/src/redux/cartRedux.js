import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers:{
        addProducts:(state, action)=>{
            state.quantity += 1;
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity 
        },
        updateProducts:(state, action)=>{
            state.total += action.payload.product.price * (action.payload.product.quantity - state.products[state.products.findIndex(item=> item._id === action.payload.id)].quantity)
            state.products[action.payload.product.index ? action.payload.product.index : state.products.findIndex(item=> item._id === action.payload.id)] = action.payload.product
        },
        productsInc:(state, action)=>{
            state.products[state.products.findIndex(item=> item._id === action.payload.id)] = action.payload.product
            state.total += action.payload.product.price
        },
        productsDec:(state, action)=>{
            state.products[state.products.findIndex(item=> item._id === action.payload.id)] = action.payload.product
            state.total -= action.payload.product.price
        },
        deleteProducts:(state, action)=>{
            state.quantity -= 1;
            state.products.splice(state.products.findIndex(item=> item._id === action.payload._id), 1)
            state.total -= action.payload.price
        }
    }
})

export const {addProducts, updateProducts, deleteProducts, productsInc, productsDec} = cartSlice.actions
export default cartSlice.reducer