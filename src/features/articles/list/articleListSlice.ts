import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticleListItem, IArticleTag, IArticleListResponse } from '../models';

export interface IArticleListState {
    entities: {
        articles: Record<string, IArticleListItem>;
        tags: Record<string, IArticleTag>;
    }
    result: Array<string>;
    isLoading: boolean;
}

const initialState: IArticleListState = {
    entities: {
        articles: {},
        tags: {},
    },
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
            state.entities.articles = action.payload.entities.articles;
            state.entities.tags = action.payload.entities.tags;
            state.result = action.payload.result;
            state.isLoading = false;
        },
        loadArticlesFailed(state) {
            state.isLoading = false;
        },
        addArticleToList(state, action: PayloadAction<IArticleListItem>) {
            state.entities.articles[action.payload.id] = action.payload;
            state.result.unshift(action.payload.id);
        }
    }
});

export const {
    loadArticlesRequest,
    loadArticlesSuccess,
    loadArticlesFailed,
    addArticleToList
} = articleList.actions;

export default articleList.reducer;