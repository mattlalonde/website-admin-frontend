import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import entitiesReducer from '../entities/entitiesSlice';
import errorReducer from '../features/errors/errorsSlice';

import articleUiRducer from '../features/articles/articleUiReducer';

import tagsReducer from '../features/tags/tagSlice';


const createRootReducer = (history?: History) => {

    let reducers = {
        entities: entitiesReducer,
        errors: errorReducer,
        articlesUi: articleUiRducer,
        tagsUi: tagsReducer
    };

    if(history) {
        reducers["router"] = connectRouter(history);
    }

    return combineReducers(reducers);
};

export default createRootReducer;