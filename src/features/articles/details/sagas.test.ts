import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchLoadArticleSaga } from './sagas';
import reducer, * as actions from './articleDetailsSlice';
import { loadArticle } from '../api';
import loadedArticle from '../__mockData__/loadArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';

describe('load article saga', () => {

    it('puts failed action on error and updates store', () => {
        const error = new Error('test error');

        return expectSaga(watchLoadArticleSaga)
                .withReducer(reducer)
                .provide([
                    [matchers.call.fn(loadArticle), throwError(error)]
                ])
                .put(actions.loadArticleFailed({error}))
                .dispatch(actions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: null,
                        isLoading: false,
                        isSaving: false,
                        serverError: error
                    });
                });
    });

    it('calls the api and updates the store', () => {
        return expectSaga(watchLoadArticleSaga)
                .withReducer(reducer)
                .provide([
                    [matchers.call.fn(loadArticle), loadedArticle]
                ])
                .put(actions.loadArticleSuccess(loadedArticle))
                .dispatch(actions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        loadedArticle: loadedArticle,
                        isLoading: false,
                        isSaving: false,
                        serverError: null
                    });
                });
    });
})