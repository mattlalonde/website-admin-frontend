import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag } from '../models';
import { TagDetailsProcessingState } from './TagDetailsProcessingState';
import { IUpdateTagRequest } from '../apiRequests';

export interface ITagDetailsState {
    tagDetailsProcessingState: TagDetailsProcessingState;
}

const initialState: ITagDetailsState = {
    tagDetailsProcessingState: TagDetailsProcessingState.None
};

const tagDetailsSlice = createSlice({
    name: 'tag/details',
    initialState,
    reducers: {
        loadTagRequest(state, action: PayloadAction<string>) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.Loading;
        },
        loadTagSuccess(state, action: PayloadAction<ITag>) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.None;
        },
        loadTagFailed(state) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.None;
        },
        updateTagRequest(state, action: PayloadAction<IUpdateTagRequest>) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.Updating;
        },
        updateTagSuccess(state, action: PayloadAction<ITag>) {
            state.tagDetailsProcessingState = TagDetailsProcessingState.None;
        },
        updateTagFailed(state) {
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
} = tagDetailsSlice.actions;

export default tagDetailsSlice.reducer;