import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag } from '../models';

export interface ITagListState {
    tags: Array<ITag>;
    isLoading: boolean;
}

const initialState: ITagListState = {
    tags: [],
    isLoading: false
};

const tagList = createSlice({
    name: 'tagList',
    initialState,
    reducers: {
        loadTagsRequest(state) {
            state.isLoading = true;
        },
        loadTagsSuccess(state, action: PayloadAction<Array<ITag>>) {
            state.tags = action.payload;
            state.isLoading = false;
        },
        addTagToList(state, action: PayloadAction<ITag>) {
            state.tags.unshift(action.payload);
        }
    }
});

export const {
    loadTagsRequest,
    loadTagsSuccess,
    addTagToList
} = tagList.actions;

export default tagList.reducer;