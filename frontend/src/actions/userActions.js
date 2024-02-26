import {
    loginFail,
    loginRequest, 
    loginSuccess, 
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearLoggedIn,
    clearLoggedOut,
    clearRegisteredIn

} from '../slices/authSlice';


import axios from 'axios';

export const login = (email, password) => async (dispatch) => {

        try {
            dispatch(loginRequest())
            const { data }  = await axios.post(`/api/v1/login`,{email,password});
            dispatch(loginSuccess(data))
        } catch (error) {
            dispatch(loginFail(error.response.data.message))
        }

}

export const clearAuthError = dispatch => {
    dispatch(clearError())
}

export const loginClear = dispatch => {
    dispatch(clearLoggedIn())
}

export const logoutClear = dispatch => {
    dispatch(clearLoggedOut())
}

export const registerClear = dispatch => {
    dispatch(clearRegisteredIn())
}

export const register = (name,email,password) => async (dispatch) => {

    try {
        dispatch(registerRequest())

        const { data }  = await axios.post(`/api/v1/register`,{name,email,password});
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(error.response.data.message))
    }

}


export const logout =  async (dispatch) => {

    try {
        await axios.get(`/api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail)
    }

}

export const updateProfile = (name,email,gender,mobile,country,designation) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())

        const { data }  = await axios.put(`/api/v1/update`,{name,email,gender,mobile,country,designation});
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(error.response.data.message))
    }

}







