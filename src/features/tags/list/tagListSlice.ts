import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITagListResponse, ITag } from '../models';
import { createTagSuccess } from '../create/tagCreateSlice';

export interface ITagListState {
    listResult: Array<string>;
    listInitialised: boolean;
    isLoading: boolean;
}

const initialState: ITagListState = {
    listResult: [],
    listInitialised: false,
    isLoading: false
};

const tagListSlice = createSlice({
    name: 'tag/list',
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
        }
    },
    extraReducers: {
        [createTagSuccess.type]: (state, action: PayloadAction<ITag>) => {
            state.listResult.unshift(action.payload.id);
        }
    }
});

export const {
    loadTagsRequest,
    loadTagsSuccess,
    loadTagsFailed
} = tagListSlice.actions;

export default tagListSlice.reducer;