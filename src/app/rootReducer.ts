import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import entitiesReducer from '../entities/entitiesSlice';
import errorReducer from '../features/errors/errorsSlice';

import articleUiReducer from '../features/articles/articleUiReducer';
import tagUiReducer from '../features/tags/tagUiReducer';


const createRootReducer = (history?: History) => {

    let reducers = {
        entities: entitiesReducer,
        errors: errorReducer,
        articlesUi: articleUiReducer,
        tagsUi: tagUiReducer
    };

    if(history) {
        reducers["router"] = connectRouter(history);
    }

    return combineReducers(reducers);
};

export default createRootReducer;