import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';

import { addTagToArticle } from '../api';
import { IArticleResponse } from '../models';

function* addTagToArticleSaga(action) {
    try {
        const data: IArticleResponse = yield call(addTagToArticle, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));        
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchAddTagToArticleSaga() {
    yield takeLatest(actions.addTagToArticleRequest, addTagToArticleSaga);
}