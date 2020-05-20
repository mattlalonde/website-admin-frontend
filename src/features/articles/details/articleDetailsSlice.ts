import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticle } from '../models';
import { IUpdateArticleContentRequest, IDeleteArticleRequest, IReinstateArticleRequest, IPublishArticleRequest, ITakeArticleOfflineRequest, IAddTagToArticleRequest, IRemoveTagFromArticleRequest } from '../apiRequests';
import { IApiErrorData } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { ITag } from '../../tags/models';

export interface IArticleDetailsState {
    loadedArticle: IArticle | null;
    processingState: ArticleDetailsProcessingState;
    loadedArticleTags: Array<ITag> | null;
}

const initialState: IArticleDetailsState = {
    loadedArticle: null,
    processingState: ArticleDetailsProcessingState.None,
    loadedArticleTags: null
};

const articleDetails = createSlice({
    name: 'articleDetails',
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
        articleActionSuccess(state, action: PayloadAction<IArticle>) {
            state.loadedArticle = action.payload;
            state.processingState = ArticleDetailsProcessingState.None;
        },
        articleActionFailed(state, action: PayloadAction<IApiErrorData>) {
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
    updateArticleContentRequest,
    deleteArticleRequest,
    reinstateArticleRequest,
    publishArticleRequest,
    takeArticleOfflineRequest,
    addTagToArticleRequest,
    removeTagFromArticleRequest,
    articleActionSuccess,
    articleActionFailed,
    unloadLoadedArticle,
    setLoadedArticle
} = articleDetails.actions;

export default articleDetails.reducer;