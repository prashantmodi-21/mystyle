import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching = true;
            state.error = false
        },
        loginSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload
        },
        loginError:(state)=>{
            state.isFetching = false;
            state.error = true
        },
        logoutSuccess:(state)=>{
            state.isFetching = false;
            state.currentUser = null
        },
        addUserStart:(state)=>{
            state.isFetching = true;
            state.error = false
        },
        addUserSuccess:(state, action)=>{
            state.isFetching = false;
            state.currentUser = action.payload
        },
        addUserError:(state)=>{
            state.isFetching = false;
            state.error = true
        }
    }
})

export const {loginStart, loginSuccess, loginError, logoutSuccess, addUserStart, addUserSuccess, addUserError} = userSlice.actions
export default userSlice.reducer