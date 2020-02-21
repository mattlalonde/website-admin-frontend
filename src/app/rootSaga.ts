import { all, fork } from 'redux-saga/effects'

import articleListSaga from '../features/articles/list/sagas';

export default function* rootSaga() {
    yield all([fork(articleListSaga)]);
}

