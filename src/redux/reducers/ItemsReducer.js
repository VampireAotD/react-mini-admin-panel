import {FETCH_ERROR, FETCH_START, FETCH_SUCCESS} from "../actions/actionTypes";

const initState = {
    loading : false,
    items : null,
    error : ''
}

export default function itemsReducer(state = initState, action) {
    switch (action.type){
        case FETCH_START:
            return{
                ...state, loading: true
            }
        case FETCH_SUCCESS:
            return{
                ...state, loading: false, items: action.items
            }
        case FETCH_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        default:
            return state
    }
}