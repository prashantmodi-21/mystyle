import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state)=>{
            state.isFetching = true
            state.error = false
        },
        loginSuccess: (state, action)=>{
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginError: (state)=>{
            state.isFetching = false
            state.error = true
        },
        logoutSuccess: (state)=>{
            state.isFetching = false
            state.currentUser = null
        },
        getUsersStart: (state)=>{
            state.isFetching = true
            state.error = false
        },
        getUsersSuccess: (state, action)=>{
            state.isFetching = false
            state.users = action.payload
        },
        getUsersError: (state)=>{
            state.isFetching = false
            state.error = true
        },
        deleteUsersStart: (state)=>{
            state.isFetching = true
            state.error = false
        },
        deleteUsersSuccess: (state, action)=>{
            state.isFetching = false
            state.users.splice(state.users.findIndex(item=>item._id === action.payload.id),1)
        },
        deleteUsersError: (state)=>{
            state.isFetching = false
            state.error = true
        },
        updateUsersStart: (state)=>{
            state.isFetching = true
            state.error = false
        },
        updateUsersSuccess: (state, action)=>{
            state.isFetching = false
            state.users[state.users.findIndex(item=>item._id === action.payload.id)] = action.payload.user
        },
        updateUsersError: (state)=>{
            state.isFetching = false
            state.error = true
        },
    }
})

export const {loginStart, loginSuccess, loginError, logoutSuccess, getUsersStart, getUsersSuccess, getUsersError, deleteUsersStart, deleteUsersSuccess, deleteUsersError, updateUsersStart, updateUsersSuccess, updateUsersError} = userSlice.actions
export default userSlice.reducer