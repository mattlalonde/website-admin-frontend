import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IArticle {
    ownerUserId: string;
    articleId: string;
    createdTimestamp: string;
    title: string;
    precis?: string;
    body?: string;
    published: boolean;
}

interface IArticleDetailsState {
    loadedArticle: IArticle | null;
    isLoading: boolean;
    isSaving: boolean;
    error: Error | string | null;
}

const initialState: IArticleDetailsState = {
    loadedArticle: null,
    isLoading: false,
    isSaving: false,
    error: null
};

const articleDetails = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {
        loadArticleRequest(state, action: PayloadAction<string>) {
            state.isLoading = true;
            state.isSaving = false;
            state.error = null;
        },
        loadArticleSuccess(state, action: PayloadAction<IArticle>) {
            state.isLoading = false;
            state.loadedArticle = action.payload;
        },
        loadArticleFailed(state, action: PayloadAction<{error: Error | string}>) {
            state.isLoading = false;
            state.loadedArticle = null;
            state.error = action.payload.error;
        },
        updateTitleRequest(state) {
            state.isLoading = false;
            state.isSaving = true;
            state.error = null;
        },
        updateTitleSuccess(state, action: PayloadAction<{articleId: string, title: string}>) {
            if(state.loadedArticle && state.loadedArticle.articleId === action.payload.articleId) {
                state.loadedArticle.title = action.payload.title;
                state.error = null;
            }
            else {
                state.error = 'Error: Unable to update article';
            }
            state.isSaving = false;
        },
        updateTitleFailed(state, action: PayloadAction<{error: Error | string}>) {
            state.isSaving = false;
            state.error = action.payload.error;
        },
        updateBodyRequest(state) {
            state.isSaving = true;
            state.isLoading = false;
            state.error = null;
        },
        updateBodySuccess(state, action: PayloadAction<{articleId: string, body: string}>) {
            if(state.loadedArticle && state.loadedArticle.articleId === action.payload.articleId) {
                state.loadedArticle.body = action.payload.body;
                state.error = null;
            }
            else {
                state.error = 'Error: Unable to update article';
            }
            state.isSaving = false;
        },
        updateBodyFailed(state, action: PayloadAction<{error: Error | string}>) {
            state.isSaving = false;
            state.error = action.payload.error;
        }   
    }
});

export const {
    loadArticleRequest,
    loadArticleSuccess,
    loadArticleFailed,
    updateTitleRequest,
    updateTitleSuccess,
    updateTitleFailed,
    updateBodyRequest,
    updateBodySuccess,
    updateBodyFailed
} = articleDetails.actions;

export default articleDetails.reducer;