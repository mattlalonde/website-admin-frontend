import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { deleteArticle } from '../api';
import { IArticleResponse } from '../models';

function* deleteArticleSaga(action) {
    try {
        const data: IArticleResponse = yield call(deleteArticle, action.payload);
        yield put(actions.articleDetailsActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleDetailsActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchDeleteArticleSaga() {
    yield takeLatest(actions.deleteArticleRequest, deleteArticleSaga);
}