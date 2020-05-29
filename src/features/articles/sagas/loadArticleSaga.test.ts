import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchLoadArticleSaga } from './loadArticleSaga';
import { loadArticle } from '../api';
import draftArticle from '../__mockData__/draftArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../models';
import { ApiError } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';

describe('load article saga', () => {
    it('puts failed action on error and updates store', () => {
        const error = ApiError.create('test error', 'something went wrong');

        return expectSaga(watchLoadArticleSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(loadArticle), throwError(error)]
                ])
                .put(articleActions.articleDetailsActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(articleActions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles).toEqual({});
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(error.apiErrorData);
                });
    });

    it('calls the api and updates the store', () => {
        return expectSaga(watchLoadArticleSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(loadArticle), draftArticle]
                ])
                .put(articleActions.articleDetailsActionSuccess(draftArticle as IArticle))
                .dispatch(articleActions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                });
    });

    it('calls the store and overwrites any existing values', () => {

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const newValues = {
            title: 'new title',
            precis: 'new prcis',
            body: 'new body'
        };

        const updatedArticle = { ...draftArticle , ...newValues };

        return expectSaga(watchLoadArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(loadArticle), updatedArticle]
                ])
                .put(articleActions.articleDetailsActionSuccess(updatedArticle as IArticle))
                .dispatch(articleActions.loadArticleRequest('test'))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(updatedArticle);
                });
    });
});