import { combineReducers } from "redux";
import loginReducer from './login/loggedInUserSlice';

export default combineReducers({
    login: loginReducer
});
