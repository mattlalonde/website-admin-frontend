import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from '../models';
import { IUpdateArticleContentRequest, IDeleteArticleRequest, IReinstateArticleRequest, IPublichArticleRequest, ITakeArticleOfflineRequest } from '../apiRequests';
import { IApiErrorData } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';

export interface IArticleDetailsState {
    loadedArticle: IArticle | null;
    processingState: ArticleDetailsProcessingState;
}

const initialState: IArticleDetailsState = {
    loadedArticle: null,
    processingState: ArticleDetailsProcessingState.None
};

const articleDetails = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {
        loadArticleRequest(state, action: PayloadAction<string>) {
            state.processingState = ArticleDetailsProcessingState.Loading;
        },
        loadArticleSuccess(state, action: PayloadAction<IArticle>) {
            state.processingState = ArticleDetailsProcessingState.None;
            state.loadedArticle = action.payload;
        },
        loadArticleFailed(state, action: PayloadAction<IApiErrorData>) {
            state.processingState = ArticleDetailsProcessingState.None;
            state.loadedArticle = null;
        },
        updateArticleContentRequest(state, action: PayloadAction<IUpdateArticleContentRequest>) {
            state.processingState = ArticleDetailsProcessingState.Updating;
        },
        updateArticleContentSuccess(state, action: PayloadAction<IArticle>) {
            state.loadedArticle = action.payload;
            state.processingState = ArticleDetailsProcessingState.None;
        },
        updateArticleContentFailed(state, action: PayloadAction<IApiErrorData>) {
            state.processingState = ArticleDetailsProcessingState.None;
        },
        deleteArticleRequest(state, action: PayloadAction<IDeleteArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.Deleting;
        },
        deleteArticleSuccess(state, action: PayloadAction<IArticle>) {
            state.loadedArticle = action.payload;
            state.processingState = ArticleDetailsProcessingState.None;

        },
        deleteArticleFailed(state, action: PayloadAction<IApiErrorData>) {
            state.processingState = ArticleDetailsProcessingState.None;
        },
        reinstateArticleRequest(state, action: PayloadAction<IReinstateArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.Reinstating;
        },
        reinstateArticleSuccess(state, action: PayloadAction<IArticle>) {
            state.loadedArticle = action.payload;
            state.processingState = ArticleDetailsProcessingState.None;
        },
        reinstateArticleFailed(state, action: PayloadAction<IApiErrorData>) {
            state.processingState = ArticleDetailsProcessingState.None;
        },
        publishArticleRequest(state, action: PayloadAction<IPublichArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.Publishing;
        },
        publishArticleSuccess(state, action: PayloadAction<IArticle>) {
            state.loadedArticle = action.payload;
            state.processingState = ArticleDetailsProcessingState.None;
        },
        publishArticleFailed(state, action: PayloadAction<IApiErrorData>) {
            state.processingState = ArticleDetailsProcessingState.None;
        },
        takeArticleOfflineRequest(state, action: PayloadAction<ITakeArticleOfflineRequest>) {
            state.processingState = ArticleDetailsProcessingState.TakingOffline;
        },
        takeArticleOfflineSuccess(state, action: PayloadAction<IArticle>) {
            state.loadedArticle = action.payload;
            state.processingState = ArticleDetailsProcessingState.None;
        },
        takeArticleOfflineFailed(state, action: PayloadAction<IApiErrorData>) {
            state.processingState = ArticleDetailsProcessingState.None;
        },
        unloadLoadedArticle(state) {
            state.processingState = ArticleDetailsProcessingState.None;
            state.loadedArticle = null;
        },
        setLoadedArticle(state, action: PayloadAction<IArticle>) {
            state.processingState = ArticleDetailsProcessingState.None;
            state.loadedArticle = action.payload;
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
    deleteArticleRequest,
    deleteArticleSuccess,
    deleteArticleFailed,
    reinstateArticleRequest,
    reinstateArticleSuccess,
    reinstateArticleFailed,
    publishArticleRequest,
    publishArticleSuccess,
    publishArticleFailed,
    takeArticleOfflineRequest,
    takeArticleOfflineSuccess,
    takeArticleOfflineFailed,
    unloadLoadedArticle,
    setLoadedArticle
} = articleDetails.actions;

export default articleDetails.reducer;