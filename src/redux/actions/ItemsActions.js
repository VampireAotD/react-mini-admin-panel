import axios from 'axios'
import storage from '../../components/Firebase/Firebase'
import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "./actionTypes";

export function fetchData() {
    return async dispatch => {
        dispatch(fetchStart())
        try{
            const response = await axios.get('https://react-mini-shop.firebaseio.com/items.json')
            dispatch(fetchSuccess(response.data))
        }
        catch (error){
            dispatch(fetchError(error))
        }
    }
}

export function deleteItem(id) {
    return async (dispatch, getState) => {
        const item = getState().items.items[id]

        try{
            if(item.image_name !== ''){
                storage
                    .storage()
                    .ref('images')
                    .child(item.image_name)
                    .delete()
            }

            await axios.delete(`https://react-mini-shop.firebaseio.com/items/${id}.json`)

            dispatch(fetchData())
        }
        catch (error){
            dispatch(fetchError(error))
        }
    }
}

export function fetchStart() {
    return {
        type : FETCH_START
    }
}

export function fetchSuccess(items) {
    return {
        type : FETCH_SUCCESS,
        items
    }
}

export function fetchError(error) {
    console.log(error)
    return{
        type : FETCH_ERROR,
        error : 'Error has occurred while fetching data'
    }
}