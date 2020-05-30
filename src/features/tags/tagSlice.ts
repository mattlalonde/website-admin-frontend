import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag, ITagListResponse } from './models';
import { TagDetailsProcessingState } from './details/TagDetailsProcessingState';
import { ICreateTagRequest, IUpdateTagRequest } from './apiRequests';

export interface ITagState {
    listResult: Array<string>;
    listInitialised: boolean;
    isLoading: boolean;
    isCreating: boolean;
    isCreatePopupOpen: boolean;
    createTagWithName: string | null;
    createTagAndAddToContentNamed: string | null;
    tagDetailsProcessingState: TagDetailsProcessingState;
}

const initialState: ITagState = {
    listResult: [],
    listInitialised: false,
    isLoading: false,
    isCreating: false,
    isCreatePopupOpen: false,
    createTagWithName: null,
    createTagAndAddToContentNamed: null,
    tagDetailsProcessingState: TagDetailsProcessingState.None
};

const tags = createSlice({
    name: 'tags',
    initialState,
    reducers: {
        loadTagsRequest(state) {
            state.isLoading = true;
        },
        loadTagsSuccess(state, action: PayloadAction<ITagListResponse>) {
            state.listResult = action.payload.result;
            state.listInitialised = true;
            state.isLoading = false;
        },
        loadTagsFailed(state) {
            state.isLoading = false;
        },
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
            state.listResult.unshift(action.payload.id);
            state.isCreating = false;
            state.isCreatePopupOpen = false;
        },
        createTagFailed(state) {
            state.isCreating = false;
        },
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
    loadTagsRequest,
    loadTagsSuccess,
    loadTagsFailed,
    openCreateTagPopup,
    closeCreateTagPopup,
    createTagRequest,
    createTagSuccess,
    createTagFailed,
    loadTagRequest,
    loadTagSuccess,
    loadTagFailed,
    updateTagRequest,
    updateTagSuccess,
    updateTagFailed
} = tags.actions;

export default tags.reducer;