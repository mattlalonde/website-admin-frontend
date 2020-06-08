import { all, fork } from 'redux-saga/effects'

import articleSagas from '../features/articles/sagas';
import tagSagas from '../features/tags/sagas';

export default function* rootSaga() {
    yield all([
        fork(articleSagas), 
        fork(tagSagas)
    ]);
}

