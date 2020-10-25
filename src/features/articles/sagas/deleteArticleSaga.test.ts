import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchDeleteArticleSaga } from './deleteArticleSaga';
import createRootReducer from '../../../app/rootReducer'; 
import * as errors from '../../errors/errorsSlice';
import { deleteArticle } from '../api';
import draftArticle from '../__mockData__/draftArticle.json';
import { IArticle, IArticleResponse } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import articleActions from '../articleActions';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { RootState } from '../../../app/store';
import { IApiResponse } from '../../../utils/api/http';

describe('delete article saga', () => {
    it('delete article failed should set error and not update areticle', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
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

        return expectSaga(watchDeleteArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(deleteArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.deleteArticleRequest({ id: draftArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
                });
    });

    it('delete article should call the api and set the new article state', () => {

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const newValues = {
            state: 'DELETED'
        };

        const updatedArticle = { ...draftArticle , ...newValues } as IArticle;
        const articleResponse: IArticleResponse = {
            article: updatedArticle,
            tags: {}
        }

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: true,
            status: 200,
            body: articleResponse
        }

        return expectSaga(watchDeleteArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(deleteArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionSuccess(articleResponse))
                .dispatch(articleActions.deleteArticleRequest({ id: draftArticle.id }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                    expect(store.entities.articles[updatedArticle.id]).toEqual(updatedArticle);
                });
    });
});