import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import articleDetailsReducer from '../features/articles/details/articleDetailsSlice';
import articleListReducer from '../features/articles/list/articleListSlice';

const createRootReducer = (history?: History) => {

    let reducers = {
        articleDetails: articleDetailsReducer,
        articleList: articleListReducer
    };

    if(history) {
        reducers["router"] = connectRouter(history);
    }

    return combineReducers(reducers);
};

export default createRootReducer;