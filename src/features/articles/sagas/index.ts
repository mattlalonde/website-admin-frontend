import { all, fork } from 'redux-saga/effects';
import { watchLoadArticleSaga } from './loadArticleSaga';
import { watchUpdateArticleContentSaga } from './updateArticleContentSaga';
import { watchDeleteArticleSaga } from './deleteArticleSaga';
import { watchReinstateArticleSaga } from './reinstateArticleSaga';
import { watchPublishArticleSaga } from './publishArticleSaga';
import { watchTakeArticleOfflineSaga } from './takeArticleOfflineSaga';
import { watchCreateArticleSaga } from './createArticleSaga';
import { watchLoadArticlesSaga } from './loadArticlesSaga';
import { watchAddTagToArticleSaga } from './addArticleTagSaga';
import { watchRemoveTagFromArticleSaga } from './removeArticleTagSaga';
import { watchCreateTagAndAddToArticleSaga } from './createTagAndAddToArticleSaga';

function* articleSagas() {
    yield all([
        fork(watchLoadArticleSaga), 
        fork(watchUpdateArticleContentSaga),
        fork(watchDeleteArticleSaga),
        fork(watchReinstateArticleSaga),
        fork(watchPublishArticleSaga),
        fork(watchTakeArticleOfflineSaga),
        fork(watchAddTagToArticleSaga),
        fork(watchRemoveTagFromArticleSaga),
        fork(watchCreateTagAndAddToArticleSaga),

        fork(watchCreateArticleSaga),

        fork(watchLoadArticlesSaga)
    ]);
}

export default articleSagas;