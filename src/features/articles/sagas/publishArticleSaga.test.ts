import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchPublishArticleSaga } from './publishArticleSaga';
import { publishArticle } from '../api';
import draftArticle from '../__mockData__/draftArticle.json';
import { IArticle, IArticleResponse } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { IApiResponse } from '../../../utils/api/http';

describe('publish article saga', () => {
    it('publish article failed should set error and not update article', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const publicationDate = new Date();

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: false,
            status: 500,
            error: {
                type: 'ApiError',
                message: 'error'
            }
        }

        return expectSaga(watchPublishArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(publishArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.publishArticleRequest({ id: draftArticle.id, data: { publicationDate: publicationDate.toUTCString() } }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
                });
    });


    it('publish article success should call api and set article with new state', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                }
            }
        });

        const publicationDate = (new Date()).toUTCString();
        const newValues = {
            state: 'PUBLISHED',
            publicationDate: publicationDate
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


        return expectSaga(watchPublishArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(publishArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionSuccess(articleResponse))
                .dispatch(articleActions.publishArticleRequest({ id: draftArticle.id, data: { publicationDate: publicationDate } }))
                .silentRun()
                .then(result => {

                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(updatedArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                });
    });
});