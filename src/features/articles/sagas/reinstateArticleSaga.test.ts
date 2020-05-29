import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchReinstateArticleSaga } from './reinstateArticleSaga';
import { reinstateArticle } from '../api';
import deletedArticle from '../__mockData__/deletedArticle.json';
import { throwError } from 'redux-saga-test-plan/providers';
import { IArticle } from '../models';
import { ApiError } from '../../../errors/ApiError';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';

describe('reinstate article saga', () => {
    it('failure should set error and not update article', () => {

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [deletedArticle.id]: deletedArticle
                }
            }
        });

        const error = ApiError.create('reinstate error', 'something went wrong');

        return expectSaga(watchReinstateArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(reinstateArticle), throwError(error)]
                ])
                .put(articleActions.articleDetailsActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
                .dispatch(articleActions.reinstateArticleRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[deletedArticle.id]).toEqual(deletedArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(error.apiErrorData);
                });
    });

    it('success should call api and set article with new state', () => {
        
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [deletedArticle.id]: deletedArticle
                }
            }
        });

        const newValues = {
            state: 'DRAFT'
        };

        const updatedArticle = { ...deletedArticle , ...newValues };


        return expectSaga(watchReinstateArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(reinstateArticle), updatedArticle]
                ])
                .put(articleActions.articleDetailsActionSuccess(updatedArticle as IArticle))
                .dispatch(articleActions.reinstateArticleRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.entities.articles[deletedArticle.id]).toEqual(updatedArticle);
                });
    });
});