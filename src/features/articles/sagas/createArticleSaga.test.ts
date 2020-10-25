import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { push } from 'connected-react-router';

import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import { watchCreateArticleSaga } from './createArticleSaga';
import { createArticle } from '../api';
import initialStoreState from '../../../app/initialStoreStateTesting';

import createdArticle from '../__mockData__/createdArticle.json';
import articleList from '../__mockData__/list.json';
import { IArticle, IArticleResponse } from '../models';
import { RootState } from '../../../app/store';
import { IApiResponse } from '../../../utils/api/http';

describe('create article saga', () => {

    it('puts failed action on error and updates store', () => {
        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: false,
            status: 500,
            error: {
                type: 'ApiError',
                message: 'error'
            }
        }

        return expectSaga(watchCreateArticleSaga)
                .withReducer(createRootReducer())
                .provide([
                    [matchers.call.fn(createArticle), apiResponse]
                ])
                .put(articleActions.createArticleFailed(apiResponse.error!))
                .dispatch(articleActions.createArticleRequest({ title: 'new article title'}))
                .silentRun()
                .then(result => {

                    const state: RootState = result.storeState;

                    expect(state.articlesUi.create).toEqual({
                        isPopupOpen: false,
                        isCreating: false,
                        createArticleServerError: apiResponse.error!.message
                    });

                    expect(state.entities.articles).toEqual({});
                });
    });

    it('creates article and updates store', () => {

        const newArticle : IArticle = createdArticle as IArticle;

        const storeState = Object.assign(initialStoreState, {
            entities: {
                articles: articleList.entities
            },
            articlesUi: {
                list: {
                    result: articleList.result
                }
            }
        });

        const articleResponse: IArticleResponse = {
            article: newArticle,
            tags: {}
        };

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: true,
            status: 200,
            body: articleResponse
        }
        
        return expectSaga(watchCreateArticleSaga)
                .withReducer(createRootReducer(), storeState)
                .provide([
                    [matchers.call.fn(createArticle), apiResponse]
                ])
                .put(articleActions.createArticleSuccess(articleResponse))
                .put(articleActions.closeCreateArticlePopup())
                .put(push(`/article-details/${createdArticle.id}`))
                .dispatch(articleActions.createArticleRequest({ title: 'new article title'}))
                .silentRun()
                .then(result => {
                    const state: RootState = result.storeState;
                    
                    expect(state.entities.articles[newArticle.id]).toEqual(newArticle);

                    expect(state.articlesUi.create).toEqual({
                        isPopupOpen: false,
                        isCreating: false,
                        createArticleServerError: null
                    });

                    expect(state.articlesUi.list.result).toEqual([newArticle.id, ...storeState.articlesUi.list.result]);
                })


    })
});
