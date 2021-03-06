import { takeLatest, put, race, take, select } from 'redux-saga/effects';

import articleActions from '../articleActions';
import tagActions from '../../tags/tagActions';
import { IArticle } from '../models';
import { ICreateTagAndAddToArticleRequest } from '../apiRequests';
import { PayloadAction } from '@reduxjs/toolkit';
import { getArticleById } from '../../../entities/articleEntitySelectors';

function* createTagAndAddToArticleSaga(action: PayloadAction<ICreateTagAndAddToArticleRequest>) {

    const article: IArticle = yield select(getArticleById(action.payload.id));

    yield put(tagActions.openCreateTagPopup({ 
        createTagName: action.payload.data.tagName,
        contentName: article.title
    }));

    const { tagCreatedSuccessfully } = yield race({
        createPopupClosed: take(tagActions.closeCreateTagPopup),
        tagCreatedSuccessfully: take(tagActions.createTagSuccess),
        tagCreationFailed: take(tagActions.createTagFailed)
    });

    if(tagCreatedSuccessfully) {
        yield put(articleActions.addTagToArticleRequest({
            id: action.payload.id,
            data: {
                tagId: tagCreatedSuccessfully.payload.id
            }
        }));
    }
    else {
        yield put(articleActions.createTagAndAddToArticleFailed());
    }

}

export function* watchCreateTagAndAddToArticleSaga() {
    yield takeLatest(articleActions.createTagAndAddToArticleRequest, createTagAndAddToArticleSaga);
}