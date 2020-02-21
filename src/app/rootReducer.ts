import { combineReducers } from '@reduxjs/toolkit';

import articleDetailsReducer from '../features/articles/details/articleDetailsSlice';
import articleListReducer from '../features/articles/list/articleListSlice';

const rootReducer = combineReducers({
    articleDetails: articleDetailsReducer,
    articleList: articleListReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;