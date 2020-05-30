import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticleResponse } from '../models';
import { IUpdateArticleContentRequest, IDeleteArticleRequest, IReinstateArticleRequest, IPublishArticleRequest, ITakeArticleOfflineRequest, IAddTagToArticleRequest, IRemoveTagFromArticleRequest, ICreateTagAndAddToArticleRequest } from '../apiRequests';
import { IApiErrorData } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';

export interface IArticleDetailsState {
    processingState: ArticleDetailsProcessingState;
}

const initialState: IArticleDetailsState = {
    processingState: ArticleDetailsProcessingState.None
};

const articleDetails = createSlice({
    name: 'article/details',
    initialState,
    reducers: {
        loadArticleRequest(state, action: PayloadAction<string>) {
            state.processingState = ArticleDetailsProcessingState.Loading;
        },
        updateArticleContentRequest(state, action: PayloadAction<IUpdateArticleContentRequest>) {
            state.processingState = ArticleDetailsProcessingState.Updating;
        },
        deleteArticleRequest(state, action: PayloadAction<IDeleteArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.Deleting;
        },
        reinstateArticleRequest(state, action: PayloadAction<IReinstateArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.Reinstating;
        },
        publishArticleRequest(state, action: PayloadAction<IPublishArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.Publishing;
        },
        takeArticleOfflineRequest(state, action: PayloadAction<ITakeArticleOfflineRequest>) {
            state.processingState = ArticleDetailsProcessingState.TakingOffline;
        },
        addTagToArticleRequest(state, action: PayloadAction<IAddTagToArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.AddingTag;
        },
        removeTagFromArticleRequest(state, action: PayloadAction<IRemoveTagFromArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.RemovingTag;
        },
        articleDetailsActionSuccess(state, action: PayloadAction<IArticleResponse>) {
            state.processingState = ArticleDetailsProcessingState.None;
        },
        articleDetailsActionFailed(state, action: PayloadAction<IApiErrorData>) {
            state.processingState = ArticleDetailsProcessingState.None;
        },
        createTagAndAddToArticleRequest(state, action: PayloadAction<ICreateTagAndAddToArticleRequest>) {
            state.processingState = ArticleDetailsProcessingState.AddingTag;
        },
        createTagAndAddToArticleFailed(state) {
            state.processingState = ArticleDetailsProcessingState.None;
        }
    }
});

export const {
    loadArticleRequest,
    updateArticleContentRequest,
    deleteArticleRequest,
    reinstateArticleRequest,
    publishArticleRequest,
    takeArticleOfflineRequest,
    addTagToArticleRequest,
    removeTagFromArticleRequest,
    articleDetailsActionSuccess,
    articleDetailsActionFailed,
    createTagAndAddToArticleRequest,
    createTagAndAddToArticleFailed
} = articleDetails.actions;

export default articleDetails.reducer;