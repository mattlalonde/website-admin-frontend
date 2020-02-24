import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IArticleListItem {
    ownerUserId: string;
    articleId: string;
    createdTimestamp: string;
    title: string;
    precis?: string;
    published: boolean;
}

interface IArticleListState {
    articles: Array<IArticleListItem>;
    isLoading: boolean;
    error: Error | string | null;
}

const initialState: IArticleListState = {
    articles: [],
    isLoading: false,
    error: null
};

const articleList = createSlice({
    name: 'articleList',
    initialState,
    reducers: {
        loadArticlesRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        loadArticlesSuccess(state, action: PayloadAction<Array<IArticleListItem>>) {
            state.articles = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loadArticlesFailed(state, action: PayloadAction<{ error: Error | string }>) {
            state.articles = [];
            state.isLoading = false;
            state.error = action.payload.error;
        }
    }
});

export const {
    loadArticlesRequest,
    loadArticlesSuccess,
    loadArticlesFailed
} = articleList.actions;

export default articleList.reducer;