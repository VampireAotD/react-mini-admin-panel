import axios from 'axios'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "./actionTypes";

export function addItem(data) {
    return async dispatch => {
        dispatch(fetchStart())
        try{
            const response  = await axios.post('https://react-mini-shop.firebaseio.com/items.json', data)

            if(response.status === 200){
                dispatch(fetchSuccess())
            }

        }
        catch (error){
            dispatch(fetchError(error))
            console.log(error)
        }
    }
}

export function fetchStart() {
    return{
        type : FETCH_START
    }
}

export function fetchSuccess() {
    return {
        type : FETCH_SUCCESS,
        status : 'New good has been added!'
    }
}

export function fetchError(error) {
    console.log(error)
    return{
        type : FETCH_ERROR,
        error : 'Error has occurred while sending request'
    }
}