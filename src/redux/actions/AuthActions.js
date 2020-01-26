import axios from 'axios'
import {AUTH_SUCCESS, FETCH_ERROR, FETCH_START, LOG_OUT} from "./actionTypes";

export function auth(userData) {
    return async dispatch => {
        dispatch(fetchStart())
        try{
            const response  = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCmQmRNNGLHGdmKPXMu6WMEXpXI2erUaZQ',userData)

            const expire = new Date(new Date().getTime() + response.data.expiresIn * 1000)

            localStorage.setItem('expire',expire)
            localStorage.setItem('token', response.data.idToken)

            dispatch(authSuccess(response.data.idToken))
            dispatch(autoLogout(response.data.expiresIn))
        }
        catch (error){
            fetchError(error)
        }
    }
}

export function fetchStart() {
    return{
        type : FETCH_START
    }
}

export function authSuccess(token) {
    return{
        type : AUTH_SUCCESS,
        token
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!token){
            dispatch(logout())
        }
        else{
            const expire = new Date(localStorage.getItem('expire'))

            if(expire <= new Date().getTime()){
                dispatch(logout())
            }
            else{
                dispatch(authSuccess(token))
                dispatch(autoLogout((expire.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('expire')

    return {
        type : LOG_OUT
    }
}

export function fetchError(error) {
    console.log(error)
    return{
        type : FETCH_ERROR,
        error : 'Wrong email or password'
    }
}