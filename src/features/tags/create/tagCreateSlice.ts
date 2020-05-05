import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag } from '../models';
import { ICreateTagRequest } from '../apiRequests';

export interface ITagCreateState {
    isTagCreatePopupOpen: boolean;
    isCreatingTag: boolean;
}

const initialState: ITagCreateState = {
    isTagCreatePopupOpen: false,
    isCreatingTag: false
}

const tagCreateSlice = createSlice({
    name: 'tagCreate',
    initialState,
    reducers: {
        setCreateTagPopupVisibility(state, action: PayloadAction<boolean>) {
            state.isTagCreatePopupOpen = action.payload;
        },
        createTagRequest(state, action: PayloadAction<ICreateTagRequest>) {
            state.isCreatingTag = true;
        },
        createTagSuccess(state, action: PayloadAction<ITag>) {
            state.isCreatingTag = false;
        },
        createTagFailed(state) {
            state.isCreatingTag = false;
        }
    }
});

export const {
    setCreateTagPopupVisibility,
    createTagRequest,
    createTagSuccess,
    createTagFailed
} = tagCreateSlice.actions;

export default tagCreateSlice.reducer;