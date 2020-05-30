import { takeLatest, put, race, take, select } from 'redux-saga/effects';

import articleActions from '../articleActions';
import tagActions from '../../tags/tagActions';
import { RootState } from '../../../app/store';
import { IArticle } from '../models';

function* createTagAndAddToArticleSaga(action) {

    const article: IArticle = yield select((state: RootState) => state.entities.articles[action.payload.id]);

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