import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchAddTagToArticleSaga } from './addArticleTagSaga';
import { addTagToArticle } from '../api';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import draftArticle from '../__mockData__/draftArticle.json';
import tag from '../__mockData__/tag.json';
import { IArticle, IArticleResponse } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';
import { IApiResponse } from '../../../utils/api/http';

describe('add article tag saga', () => {

    it('puts failed action on error and updates store', () => {
        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: false,
            status: 500,
            error: {
                type: 'ApiError',
                message: 'error'
            }
        }

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                },
                tags: {
                    [tag.id]: tag
                }
            }
        });

        return expectSaga(watchAddTagToArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(addTagToArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.addTagToArticleRequest({
                    id: draftArticle.id,
                    data: {
                        tagId: tag.id
                    }
                }))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
                });
    });

    it('adds tag to article', () => {
        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticle.id]: draftArticle
                },
                tags: {
                    [tag.id]: tag
                }
            }
        });

        const newValues = {
            tags: [tag.id]
        };

        const updatedArticle = { ...draftArticle , ...newValues } as IArticle;
        const articleResponse: IArticleResponse = {
            article: updatedArticle,
            tags: {
                [tag.id]: tag
            }
        }

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: true,
            status: 200,
            body: articleResponse
        }

        return expectSaga(watchAddTagToArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(addTagToArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionSuccess(articleResponse))
                .dispatch(articleActions.addTagToArticleRequest({
                    id: draftArticle.id,
                    data: {
                        tagId: tag.id
                    }
                }))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(updatedArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                });
    })
});