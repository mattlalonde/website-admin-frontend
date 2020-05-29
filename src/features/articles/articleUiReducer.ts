import { combineReducers } from "redux";
import createReducer from './create/articleCreateSlice';
import detailsReducer from './details/articleDetailsSlice';
import listReducer from './list/articleListSlice';


export default combineReducers({
    create: createReducer,
    details: detailsReducer,
    list: listReducer
});