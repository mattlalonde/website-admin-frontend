import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICreateArticleRequest, IArticle } from '../models';

export interface IArticleCreateState {
    isPopupOpen: boolean;
    isCreating: boolean;
    createArticleServerError: Error | string | null;
}

const initialState: IArticleCreateState = {
    isPopupOpen: false,
    isCreating: false,
    createArticleServerError: null
};

const articleCreateSlice = createSlice({
    name: 'articleCreate',
    initialState,
    reducers: {
        setCreateArticlePopupVisibility(state, action: PayloadAction<boolean>) {
            state.isPopupOpen = action.payload;
        },
        createArticleRequest(state, action: PayloadAction<ICreateArticleRequest>) {
            state.isCreating = true;
            state.createArticleServerError = null;
        },
        createArticleSuccess(state, action: PayloadAction<IArticle>) {
            state.isCreating = false;
            state.createArticleServerError = null;
        },
        createArticleFailed(state, action: PayloadAction<{ error: Error | string }>) {
            state.isCreating = false;
            state.createArticleServerError = action.payload.error;
        }
    }
});

export const {
    setCreateArticlePopupVisibility,
    createArticleRequest,
    createArticleSuccess,
    createArticleFailed
} = articleCreateSlice.actions;

export default articleCreateSlice.reducer;