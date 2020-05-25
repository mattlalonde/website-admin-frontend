import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import entitiesReducer from '../entities/entitiesSlice';
import errorReducer from '../features/errors/errorsSlice';

import articleDetailsReducer from '../features/articles/details/articleDetailsSlice';
import articleListReducer from '../features/articles/list/articleListSlice';
import articleCreateReducer from '../features/articles/create/articleCreateSlice';

import tagsReducer from '../features/tags/tagSlice';


const createRootReducer = (history?: History) => {

    let reducers = {
        entities: entitiesReducer,
        errors: errorReducer,
        articleDetails: articleDetailsReducer,
        articleList: articleListReducer,
        articleCreate: articleCreateReducer,
        tags: tagsReducer
    };

    if(history) {
        reducers["router"] = connectRouter(history);
    }

    return combineReducers(reducers);
};

export default createRootReducer;