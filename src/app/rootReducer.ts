import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import errorReducer from '../features/errors/errorsSlice';

import articleDetailsReducer from '../features/articles/details/articleDetailsSlice';
import articleListReducer from '../features/articles/list/articleListSlice';
import articleCreateReducer from '../features/articles/create/articleCreateSlice';


const createRootReducer = (history?: History) => {

    let reducers = {
        errors: errorReducer,
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