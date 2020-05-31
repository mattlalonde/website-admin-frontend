import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITag, ITagListResponse } from '../features/tags/models';
import { IArticle, IArticleListResponse, IArticleResponse } from '../features/articles/models';
import articleActions from '../features/articles/articleActions';
import tagActions from '../features/tags/tagActions';

export interface IEntitiesState {
    tags: Record<string, ITag>;
    articles: Record<string, IArticle>;
}

const initialState: IEntitiesState = {
    tags: {},
    articles: {}
}

const entities = createSlice({
    name: 'entities',
    initialState,
    reducers: {},
    extraReducers: {
        [tagActions.loadTagsSuccess.type]: (state, action: PayloadAction<ITagListResponse>) => {
            state.tags = Object.assign(state.tags, action.payload.entities.tags);
        },
        [tagActions.createTagSuccess.type]: (state, action: PayloadAction<ITag>) => {
            state.tags[action.payload.id] = action.payload;
        },
        [tagActions.loadTagSuccess.type]: (state, action: PayloadAction<ITag>) => {
            state.tags[action.payload.id] = Object.assign({}, state.tags[action.payload.id], action.payload);
        },
        [tagActions.updateTagSuccess.type]: (state, action: PayloadAction<ITag>) => {
            state.tags[action.payload.id] = Object.assign({}, state.tags[action.payload.id], action.payload);
        },
        [articleActions.createArticleSuccess.type]: (state, action: PayloadAction<IArticleResponse>) => {
            state.articles[action.payload.article.id] = action.payload.article;
        },
        [articleActions.loadArticlesSuccess.type]: (state, action: PayloadAction<IArticleListResponse>) => {
            state.articles = Object.assign(state.articles, action.payload.entities.articles);
            state.tags = Object.assign(state.tags, action.payload.entities.tags);
        },
        [articleActions.articleDetailsActionSuccess.type]: (state, action: PayloadAction<IArticleResponse>) => {
            state.articles[action.payload.article.id] = Object.assign({}, state.articles[action.payload.article.id], action.payload.article);
            state.tags = Object.assign({}, state.tags, action.payload.tags);
        }
    }
});

export default entities.reducer;