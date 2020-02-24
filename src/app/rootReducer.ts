import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router'

import articleDetailsReducer from '../features/articles/details/articleDetailsSlice';
import articleListReducer from '../features/articles/list/articleListSlice';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    articleDetails: articleDetailsReducer,
    articleList: articleListReducer
});

export default createRootReducer;