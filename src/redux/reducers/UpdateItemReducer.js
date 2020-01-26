import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS, UPDATE_ITEM} from "../actions/actionTypes";

const initState = {
    loading : false,
    status : '',
    item : null,
    error : ''
}

export default function updateItemReducer(state = initState, action) {

    switch (action.type){
        case FETCH_START:
            return{
                ...state, loading: true
            }
        case FETCH_SUCCESS:
            return{
                ...state, loading: false, item: action.item
            }
        case UPDATE_ITEM:
            return{
                ...state, loading: false, status: action.status
            }
        case FETCH_ERROR:
            return{
                ...state, loading: false, error : action.error
            }
        default:
            return state
    }
}