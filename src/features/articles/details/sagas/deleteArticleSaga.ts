import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../articleDetailsSlice';
import * as errors from '../../../errors/errorsSlice';
import { deleteArticle } from '../../api';

function* deleteArticleSaga(action) {
    try {
        const data = yield call(deleteArticle, action.payload);
        yield put(actions.articleActionSuccess(data));
    }
    catch(error) {
        yield put(actions.articleActionFailed(error.apiErrorData));
        yield put(errors.setError(error.apiErrorData));
    }
}

export function* watchDeleteArticleSaga() {
    yield takeLatest(actions.deleteArticleRequest, deleteArticleSaga);
}