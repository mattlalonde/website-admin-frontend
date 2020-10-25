import { takeLatest, call, put } from 'redux-saga/effects';

import * as actions from '../details/articleDetailsSlice';
import * as errors from '../../errors/errorsSlice';
import { loadArticle } from '../api';
import { IArticleResponse } from '../models';
import { IApiResponse } from '../../../utils/api/http';
import { defaultError } from '../../errors/models';

function* loadArticleSaga(action) {
    const response: IApiResponse<IArticleResponse> = yield call(loadArticle, action.payload);

    if(response.ok && response.body) {
        yield put(actions.articleDetailsActionSuccess(response.body));
    }
    else {
        yield put(actions.articleDetailsActionFailed());
        yield put(errors.setError(response.error ?? defaultError));
    }
}

export function* watchLoadArticleSaga() {
    yield takeLatest(actions.loadArticleRequest, loadArticleSaga);
}