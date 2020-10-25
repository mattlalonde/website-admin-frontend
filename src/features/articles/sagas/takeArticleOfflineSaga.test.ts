import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchTakeArticleOfflineSaga } from './takeArticleOfflineSaga';
import { takeArticleOffline } from '../api';
import publishedArticle from '../__mockData__/publishedArticle.json';
import { IArticle, IArticleResponse } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { IApiResponse } from '../../../utils/api/http';

describe('take article offline saga', () => {
    it('failure should set error and not update article', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [publishedArticle.id]: publishedArticle
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

        return expectSaga(watchTakeArticleOfflineSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(takeArticleOffline), apiResponse]
                ])
                .put(articleActions.articleDetailsActionFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.takeArticleOfflineRequest({ id: publishedArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[publishedArticle.id]).toEqual(publishedArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
                });
    });

    it('success should call api and set article with new state', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [publishedArticle.id]: publishedArticle
                }
            }
        });

        const newValues = {
            state: 'DRAFT',
            publicationDate: null
        };

        const updatedArticle = { ...publishedArticle , ...newValues } as IArticle;
        const articleResponse: IArticleResponse = {
            article: updatedArticle,
            tags: {}
        }

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: true,
            status: 200,
            body: articleResponse
        }

        return expectSaga(watchTakeArticleOfflineSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(takeArticleOffline), apiResponse]
                ])
                .put(articleActions.articleDetailsActionSuccess(articleResponse))
                .dispatch(articleActions.takeArticleOfflineRequest({ id: publishedArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[publishedArticle.id]).toEqual(updatedArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                });
    });
});