import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import *  as articleCreateActions from './articleCreateSlice';
import * as articleDetailsActions from '../details/articleDetailsSlice';
import * as articleListActions from '../list/articleListSlice';
import { createArticle } from '../api';
import { IArticle } from '../models';

function* createArticleSaga(action) {
    try {
        const data: IArticle = yield call(createArticle, action.payload);
        yield put(articleCreateActions.createArticleSuccess(data));
        yield put(articleDetailsActions.setLoadedArticle(data));
        yield put(articleCreateActions.setCreateArticlePopupVisibility(false));
        yield put(articleListActions.addArticleToList({
            id: data.id,
            createdTimestamp:data.createdTimestamp,
            state: data.state,
            title: data.title,
            tags:[]
        }));
        yield put(push(`/article-details/${data.id}`));
    }
    catch(error) {
        yield put(articleCreateActions.createArticleFailed({error}));
    }
}

export function* watchCreateArticleSaga() {
    yield takeEvery(articleCreateActions.createArticleRequest, createArticleSaga);
}
