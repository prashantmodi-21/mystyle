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
            state.total += action.payload.price * action.payload.qty 
        },
        updateProducts:(state, action)=>{
            console.log(action.payload)
            state.total += action.payload.product.price * (action.payload.product.qty - state.products[action.payload.index ? action.payload.index : state.products.findIndex(item=> item._id === action.payload.id)].qty)
            state.products[action.payload.index ? action.payload.index : state.products.findIndex(item=> item._id === action.payload.id)] = action.payload.product
        },
        productsInc:(state, action)=>{
            state.products[action.payload.index ? action.payload.index : state.products.findIndex(item=> item._id === action.payload.id)] = action.payload.product
            state.total += action.payload.product.price
        },
        productsDec:(state, action)=>{
            state.products[action.payload.index ? action.payload.index : state.products.findIndex(item=> item._id === action.payload.id)] = action.payload.product
            state.total -= action.payload.product.price
        },
        deleteProducts:(state, action)=>{
            state.quantity -= 1;
            state.total -= action.payload.price
            state.products.splice(action.payload.index ? action.payload.index : state.products.findIndex(item=> item._id === action.payload._id), 1)
        },
        getProducts: (state, action)=>{
            state.products = action.payload.products,
            state.quantity = action.payload.products.length
            state.total = action.payload.total
        },
        cleanCart: (state)=>{
            state.products = [],
            state.quantity = 0,
            state.total = 0
        }
    }
})

export const {addProducts, updateProducts, deleteProducts, productsInc, productsDec, getProducts, cleanCart} = cartSlice.actions
export default cartSlice.reducer