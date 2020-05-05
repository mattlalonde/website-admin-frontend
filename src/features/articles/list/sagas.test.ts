import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchLoadArticlesSaga } from './sagas';
import reducer, * as actions from './articleListSlice';
import { loadArticles } from '../api';
import articleList from '../__mockData__/list.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticleListItem } from '../models';


describe('load article list saga', () => {

    it('puts failed action on error and updates store', () => {
        const error = new Error('test error');

        return expectSaga(watchLoadArticlesSaga)
                .withReducer(reducer)
                .provide([
                    [matchers.call.fn(loadArticles), throwError(error)]
                ])
                .put(actions.loadArticlesFailed({ error }))
                .dispatch(actions.loadArticlesRequest())
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        articles: [],
                        isLoading: false,
                        error: error
                    });
                });
    });

    it('calls the api and updates the store', () => {
        return expectSaga(watchLoadArticlesSaga)
                .withReducer(reducer)
                .provide([
                    [matchers.call.fn(loadArticles), articleList]
                ])
                .put(actions.loadArticlesSuccess(articleList as Array<IArticleListItem>))
                .dispatch(actions.loadArticlesRequest())
                .silentRun()
                .then(result => {
                    expect(result.storeState).toEqual({
                        articles: articleList,
                        isLoading: false,
                        error: null
                    });
                });
    });

});