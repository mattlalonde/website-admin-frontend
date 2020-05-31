import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticleResponse } from '../models';
import { ICreateArticleRequest } from '../apiRequests';
import { IApiErrorData } from '../../../errors/ApiError';

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
    name: 'article/create',
    initialState,
    reducers: {
        openCreateArticlePopup(state) {
            state.isPopupOpen = true;
        },
        closeCreateArticlePopup(state) {
            state.isPopupOpen = false;
        },
        createArticleRequest(state, action: PayloadAction<ICreateArticleRequest>) {
            state.isCreating = true;
            state.createArticleServerError = null;
        },
        createArticleSuccess(state, action: PayloadAction<IArticleResponse>) {
            state.isCreating = false;
            state.createArticleServerError = null;
        },
        createArticleFailed(state, action: PayloadAction<IApiErrorData>) {
            state.isCreating = false;
            state.createArticleServerError = action.payload.apierror.message;
        }
    }
});

export const {
    openCreateArticlePopup,
    closeCreateArticlePopup,
    createArticleRequest,
    createArticleSuccess,
    createArticleFailed
} = articleCreateSlice.actions;

export default articleCreateSlice.reducer;