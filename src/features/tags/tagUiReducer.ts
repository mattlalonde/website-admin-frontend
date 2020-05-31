import { combineReducers } from "redux";
import createReducer from './create/tagCreateSlice';
import detailsReducer from './details/tagDetailsSlice';
import listReducer from './list/tagListSlice';

export default combineReducers({
    create: createReducer,
    details: detailsReducer,
    list: listReducer
});