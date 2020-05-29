import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';

import { removeTagFromArticle } from '../api';
import { IArticleResponse } from '../models';

function* removeTagFromArticleSaga(action) {
    try {
        const data: IArticleResponse = yield call(removeTagFromArticle, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));        
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchRemoveTagFromArticleSaga() {
    yield takeLatest(actions.removeTagFromArticleRequest, removeTagFromArticleSaga);
}