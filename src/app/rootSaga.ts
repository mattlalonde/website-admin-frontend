import { all, fork } from 'redux-saga/effects'

import articleSagas from '../features/articles/articleSagas';
import tagSagas from '../features/tags/tagSagas';

export default function* rootSaga() {
    yield all([
        fork(articleSagas), 
        fork(tagSagas)
    ]);
}

