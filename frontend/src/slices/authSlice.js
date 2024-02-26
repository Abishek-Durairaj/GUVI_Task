import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticated: false,
        loggedIn: false,
        registeredIn : false,
        loggedOut : false
    },
    reducers: {
        loginRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                loggedIn: true,
                user: action.payload.user
            }
        },
        loginFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error:  null
            }
        },
        clearLoggedIn(state, action){
            return {
                ...state,
                loggedIn: false
            }
        },
        registerRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        registerSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: true,
                registeredIn: true,
                user: action.payload.user
            }
        },
        registerFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearRegisteredIn(state, action){
            return {
                ...state,
                registeredIn: false
            }
        },        
        logoutSuccess(state, action){
            return {
                loading: false,
                isAuthenticated: false,
                loggedOut:true
            }
        },
        logoutFail(state, action){
            return {
                ...state,
                error:  action.payload
            }
        },
        clearLoggedOut(state, action){
            return {
                ...state,
                loggedOut: false
            }
        },
        updateProfileRequest(state, action){
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action){
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action){
            return {
                ...state,
                loading: false,
                error:  action.payload
            }
        },
        clearUpdateProfile(state, action){
            return {
                ...state,
                isUpdated: false
            }
        },        
    }
});

const { actions, reducer } = authSlice;

export const { 
    loginRequest, 
    loginSuccess, 
    loginFail, 
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    logoutFail,
    logoutSuccess,
    updateProfileFail,
    updateProfileRequest,
    updateProfileSuccess,
    clearUpdateProfile,
    clearLoggedIn,
    clearLoggedOut,
    clearRegisteredIn
    
 } = actions;

export default reducer;

