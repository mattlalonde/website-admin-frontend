import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchLoadArticlesSaga } from './loadArticlesSaga';
import { loadArticles } from '../api';
import articleList from '../__mockData__/list.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticleListResponse } from '../models';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import { IApiResponse } from '../../../utils/api/http';


describe('load article list saga', () => {

    it('puts failed action on error and updates store', () => {

        const apiResponse: IApiResponse<IArticleListResponse> = {
            ok: false,
            status: 500,
            error: {
                type: 'ApiError',
                message: 'error'
            }
        }

        return expectSaga(watchLoadArticlesSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(loadArticles), apiResponse]
                ])
                .put(articleActions.loadArticlesFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.loadArticlesRequest())
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles).toEqual({});
                    expect(store.articlesUi.list.result).toEqual([]);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
                });
    });

    it('calls the api and updates the store', () => {
        const apiResponse: IApiResponse<IArticleListResponse> = {
            ok: true,
            status: 200,
            body: articleList as IArticleListResponse
        }

        return expectSaga(watchLoadArticlesSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(loadArticles), apiResponse]
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