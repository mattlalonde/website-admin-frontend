import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag } from '../models';
import { ICreateTagRequest } from '../apiRequests';

export interface ITagCreateState {
    isCreating: boolean;
    isCreatePopupOpen: boolean;
    createTagWithName: string | null;
    createTagAndAddToContentNamed: string | null;
}

const initialState: ITagCreateState = {
    isCreating: false,
    isCreatePopupOpen: false,
    createTagWithName: null,
    createTagAndAddToContentNamed: null
};

const tagCreateSlice = createSlice({
    name: 'tag/create',
    initialState,
    reducers: {
        openCreateTagPopup(state, action: PayloadAction<{ createTagName: string, contentName: string } | undefined>) {
            state.isCreatePopupOpen = true;
            state.createTagWithName = action.payload?.createTagName || null;
            state.createTagAndAddToContentNamed = action.payload?.contentName || null;
        },
        closeCreateTagPopup(state) {
            state.isCreatePopupOpen = false;
            state.createTagWithName = null;
            state.createTagAndAddToContentNamed =  null;
        },
        createTagRequest(state, action: PayloadAction<ICreateTagRequest>) {
            state.isCreating = true;
        },
        createTagSuccess(state, action: PayloadAction<ITag>) {
            
            state.isCreating = false;
            state.isCreatePopupOpen = false;
        },
        createTagFailed(state) {
            state.isCreating = false;
        }
    }
});

export const {
    openCreateTagPopup,
    closeCreateTagPopup,
    createTagRequest,
    createTagSuccess,
    createTagFailed
} = tagCreateSlice.actions;

export default tagCreateSlice.reducer;