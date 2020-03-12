import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle, IUpdateArticleContentRequest } from '../models';

interface IArticleDetailsState {
    loadedArticle: IArticle | null;
    isLoading: boolean;
    isSaving: boolean;
    serverError: Error | string | null;
}

const initialState: IArticleDetailsState = {
    loadedArticle: null,
    isLoading: false,
    isSaving: false,
    serverError: null
};

const articleDetails = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {
        loadArticleRequest(state, action: PayloadAction<string>) {
            state.isLoading = true;
            state.isSaving = false;
            state.serverError = null;
        },
        loadArticleSuccess(state, action: PayloadAction<IArticle>) {
            state.isLoading = false;
            state.loadedArticle = action.payload;
        },
        loadArticleFailed(state, action: PayloadAction<{error: Error | string}>) {
            state.isLoading = false;
            state.loadedArticle = null;
            state.serverError = action.payload.error;
        },
        updateArticleContentRequest(state, action: PayloadAction<IUpdateArticleContentRequest>) {
            state.isLoading = false;
            state.isSaving = true;
            state.serverError = null;
        },
        updateArticleContentSuccess(state, action: PayloadAction<IArticle>) {
            if(state.loadedArticle && state.loadedArticle.articleId === action.payload.articleId) {
                state.loadedArticle = action.payload;
            }
            else {
                state.serverError = 'Error: loaded article mismatch, please reload article';
            }
            state.isSaving = false;
        },
        updateArticleContentFailed(state, action: PayloadAction<{error: Error | string }>) {
            state.isSaving = false;
            state.serverError = action.payload.error;
        },
        unloadLoadedArticle(state) {
            state.isSaving = false;
            state.isLoading = false;
            state.loadedArticle = null;
            state.serverError = null;
        }
    }
});

export const {
    loadArticleRequest,
    loadArticleSuccess,
    loadArticleFailed,
    updateArticleContentRequest,
    updateArticleContentSuccess,
    updateArticleContentFailed,
    unloadLoadedArticle
} = articleDetails.actions;

export default articleDetails.reducer;