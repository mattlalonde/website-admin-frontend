import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle, IArticleListResponse } from '../models';
import { createArticleSuccess } from '../create/articleCreateSlice';

export interface IArticleListState {
    result: Array<string>;
    isLoading: boolean;
}

const initialState: IArticleListState = {
    result:[],
    isLoading: false
};

const articleList = createSlice({
    name: 'articleList',
    initialState,
    reducers: {
        loadArticlesRequest(state) {
            state.isLoading = true;
        },
        loadArticlesSuccess(state, action: PayloadAction<IArticleListResponse>) {
            state.result = action.payload.result;
            state.isLoading = false;
        },
        loadArticlesFailed(state) {
            state.isLoading = false;
        }
    },
    extraReducers: {
        [createArticleSuccess.type]: (state, action: PayloadAction<IArticle>) => {
            state.result.unshift(action.payload.id);
        }
    }
});

export const {
    loadArticlesRequest,
    loadArticlesSuccess,
    loadArticlesFailed
} = articleList.actions;

export default articleList.reducer;