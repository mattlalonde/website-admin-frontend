import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag, ITagListResponse } from '../features/tags/models';
import { loadTagsSuccess, createTagSuccess, loadTagSuccess, updateTagSuccess } from '../features/tags/tagSlice';

interface IEntitiesState {
    tags: Record<string, ITag>;
}

const initialState: IEntitiesState = {
    tags: {}
}

const entities = createSlice({
    name: 'entities',
    initialState,
    reducers: {},
    extraReducers: {
        [loadTagsSuccess.type]: (state, action: PayloadAction<ITagListResponse>) => {
            state.tags = action.payload.entities.tags;
        },
        [createTagSuccess.type]: (state, action: PayloadAction<ITag>) => {
            state.tags[action.payload.id] = action.payload;
        },
        [loadTagSuccess.type]: (state, action: PayloadAction<ITag>) => {
            state.tags[action.payload.id] = action.payload;
        },
        [updateTagSuccess.type]: (state, action: PayloadAction<ITag>) => {
            state.tags[action.payload.id] = action.payload;
        }
    }
});

export default entities.reducer;