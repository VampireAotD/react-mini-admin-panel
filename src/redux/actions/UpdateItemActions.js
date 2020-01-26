import axios from 'axios'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, UPDATE_ITEM} from "./actionTypes";

export function fetchItem(id) {
    return async dispatch => {
        dispatch(fetchStart())

        try{
            const response = await axios.get(`https://react-mini-shop.firebaseio.com/items/${id}.json`)

            dispatch(fetchSuccess(response.data))
        }
        catch (error){
            dispatch(fetchError(error))
        }
    }
}

export function updateItem(id, values) {
    return async dispatch => {
        dispatch(fetchStart())
        try{
            const response = await axios.put(`https://react-mini-shop.firebaseio.com/items/${id}.json`, values)

            if(response.status === 200){
                dispatch(updateItemSuccess())
            }
        }
        catch(error){
            dispatch(fetchError(error))
        }

    }
}

export function fetchStart() {
    return {
        type : FETCH_START
    }
}

export function fetchSuccess(item) {
    return{
        type : FETCH_SUCCESS,
        item
    }
}

export function updateItemSuccess() {
    return{
        type : UPDATE_ITEM,
        status : 'Item has been updated'
    }
}

export function fetchError(error) {
    console.log(error)
    return{
        type : FETCH_ERROR,
        error : 'Error has occured while fetching data'
    }
}
