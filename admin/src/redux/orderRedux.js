import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        isFetching: false,
        error: false
    },
    reducers: {
        getOrdersStart: (state)=>{
            state.isFetching = true
            state.error = false
        },
        getOrdersSuccess: (state, action)=>{
            state.isFetching = false
            state.orders = action.payload
        },
        getOrdersError: (state)=>{
            state.isFetching = false
            state.error = true
        },
        deleteOrdersStart: (state)=>{
            state.isFetching = true
            state.error = false
        },
        deleteOrdersSuccess: (state, action)=>{
            state.isFetching = false
            state.orders.splice(state.orders.findIndex(item=>item._id === action.payload.id),1)
        },
        deleteOrdersError: (state)=>{
            state.isFetching = false
            state.error = true
        },
        updateOrdersStart: (state)=>{
            state.isFetching = true
            state.error = false
        },
        updateOrdersSuccess: (state, action)=>{
            state.isFetching = false
            state.orders[state.orders.findIndex(item=>item._id === action.payload.id)] = action.payload.order
        },
        updateOrdersError: (state)=>{
            state.isFetching = false
            state.error = true
        }
    }
})

export const {getOrdersStart, getOrdersSuccess, getOrdersError, deleteOrdersStart, deleteOrdersSuccess, deleteOrdersError, updateOrdersStart, updateOrdersSuccess, updateOrdersError} = orderSlice.actions
export default orderSlice.reducer