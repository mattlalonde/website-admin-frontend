import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag } from '../models';
import { TagDetailsProcessingState } from './TagDetailsProcessingState';
import { IApiErrorData } from '../../../errors/ApiError';
import { IUpdateTagRequest } from '../apiRequests';

export interface ITagDetailsState {
    loadedTag: ITag | null;
    tagDetailsProcessingState: TagDetailsProcessingState
}

const initialState: ITagDetailsState = {
    loadedTag: null,
    tagDetailsProcessingState: TagDetailsProcessingState.None
};

const tagDetails = createSlice({
    name: 'tagDetails',
    initialState,
    reducers: {
        loadTagRequest(state, action: PayloadAction<string>) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.Loading;
        },
        loadTagSuccess(state, action: PayloadAction<ITag>) {
            state.loadedTag = action.payload;
            state.tagDetailsProcessingState = TagDetailsProcessingState.None;
        },
        loadTagFailed(state, action: PayloadAction<IApiErrorData>) {
            state.loadedTag = null;
            state.tagDetailsProcessingState = TagDetailsProcessingState.None;
        },
        updateTagRequest(state, action: PayloadAction<IUpdateTagRequest>) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.Updating;
        },
        updateTagSuccess(state, action: PayloadAction<ITag>) {
            state.loadedTag = action.payload;
            state.tagDetailsProcessingState = TagDetailsProcessingState.None;
        },
        updateTagFailed(state, action: PayloadAction<IApiErrorData>) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.None;
        }
    }
});

export const {
    loadTagRequest,
    loadTagSuccess,
    loadTagFailed,
    updateTagRequest,
    updateTagSuccess,
    updateTagFailed
} = tagDetails.actions;

export default tagDetails.reducer;

