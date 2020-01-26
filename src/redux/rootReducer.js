import { combineReducers } from 'redux'
import additem from './reducers/AddNewItemReducer'
import items from './reducers/ItemsReducer'
import update from './reducers/UpdateItemReducer'
import auth from './reducers/AuthReducer'

export default combineReducers({
    additem,
    items,
    update,
    auth
})
