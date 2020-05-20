import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';

import { addTagToArticle } from '../../api';
import { IArticle } from '../../models';

function* addTagToArticleSaga(action) {
    try {
        const data: IArticle = yield call(addTagToArticle, action.payload);
        yield put(actions.articleActionSuccess(data));        
    }
    catch(error) {
        yield put(actions.articleActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchAddTagToArticleSaga() {
    yield takeLatest(actions.addTagToArticleRequest, addTagToArticleSaga);
}