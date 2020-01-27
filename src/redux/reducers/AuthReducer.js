import {AUTH_SUCCESS, FETCH_ERROR, FETCH_START, LOG_OUT} from "../actions/actionTypes";

const initState = {
    token : null,
    loading : false,
    error : ''
}

export default function authReducer(state=initState, action) {
    switch (action.type){
        case FETCH_START:
            return{
                ...state, loading: true
            }
        case AUTH_SUCCESS:
            return{
                ...state, token: action.token, loading : false
            }
        case LOG_OUT:
            return{
                ...state, token: null, loading: false
            }
        case FETCH_ERROR:
            return{
                ...state, loading: false, error : action.error
            }
        default:
            return state
    }
}