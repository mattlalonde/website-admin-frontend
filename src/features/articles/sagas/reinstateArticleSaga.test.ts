import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchReinstateArticleSaga } from './reinstateArticleSaga';
import { reinstateArticle } from '../api';
import deletedArticle from '../__mockData__/deletedArticle.json';
import { IArticle, IArticleResponse } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { IApiResponse } from '../../../utils/api/http';

describe('reinstate article saga', () => {
    it('failure should set error and not update article', () => {

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [deletedArticle.id]: deletedArticle
                }
            }
        });

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: false,
            status: 500,
            error: {
                type: 'ApiError',
                message: 'error'
            }
        }

        return expectSaga(watchReinstateArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(reinstateArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.reinstateArticleRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[deletedArticle.id]).toEqual(deletedArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
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

        const updatedArticle = { ...deletedArticle , ...newValues }as IArticle;
        const articleResponse: IArticleResponse = {
            article: updatedArticle,
            tags: {}
        }

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: true,
            status: 200,
            body: articleResponse
        }

        return expectSaga(watchReinstateArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(reinstateArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionSuccess(articleResponse))
                .dispatch(articleActions.reinstateArticleRequest({ id: deletedArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.entities.articles[deletedArticle.id]).toEqual(updatedArticle);
                });
    });
});