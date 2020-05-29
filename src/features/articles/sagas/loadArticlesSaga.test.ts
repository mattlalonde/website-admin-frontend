import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchLoadArticlesSaga } from './loadArticlesSaga';
import { loadArticles } from '../api';
import articleList from '../__mockData__/list.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticleListResponse } from '../models';
import { ApiError } from '../../../errors/ApiError';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';


describe('load article list saga', () => {

    it('puts failed action on error and updates store', () => {

        const error = ApiError.create('load error', 'something went wrong');

        return expectSaga(watchLoadArticlesSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(loadArticles), throwError(error)]
                ])
                .put(articleActions.loadArticlesFailed())
                .put(errors.setError(error.apiErrorData))
                .dispatch(articleActions.loadArticlesRequest())
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles).toEqual({});
                    expect(store.articlesUi.list.result).toEqual([]);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(error.apiErrorData);
                });
    });

    it('calls the api and updates the store', () => {
        return expectSaga(watchLoadArticlesSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(loadArticles), articleList]
                ])
                .put(articleActions.loadArticlesSuccess(articleList as IArticleListResponse))
                .dispatch(articleActions.loadArticlesRequest())
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities).toEqual(articleList.entities);
                    expect(store.articlesUi.list.result).toEqual(articleList.result);
                });
    });

});