import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import articleDetailsReducer from '../features/articles/details/articleDetailsSlice';
import articleListReducer from '../features/articles/list/articleListSlice';
import articleCreateReducer from '../features/articles/create/articleCreateSlice';

const createRootReducer = (history?: History) => {

    let reducers = {
        articleDetails: articleDetailsReducer,
        articleList: articleListReducer,
        articleCreate: articleCreateReducer
    };

    if(history) {
        reducers["router"] = connectRouter(history);
    }

    return combineReducers(reducers);
};

export default createRootReducer;