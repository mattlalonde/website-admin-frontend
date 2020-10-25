import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchRemoveTagFromArticleSaga } from './removeArticleTagSaga';
import { removeTagFromArticle } from '../api';
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

describe('remove article tag saga', () => {
    it('puts failed action on error and updates store', () => {
        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: false,
            status: 500,
            error: {
                type: 'ApiError',
                message: 'error'
            }
        }

        const draftArticleWithTag = {
            ...draftArticle,
            ...{
                tags: [tag.id]
            }
        }

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticleWithTag.id]: draftArticleWithTag
                },
                tags: {
                    [tag.id]: tag
                }
            }
        });

        return expectSaga(watchRemoveTagFromArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(removeTagFromArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionFailed())
                .put(errors.setError(apiResponse.error!))
                .dispatch(articleActions.removeTagFromArticleRequest({
                    id: draftArticleWithTag.id,
                    data: {
                        tagId: tag.id
                    }
                }))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticleWithTag.id]).toEqual(draftArticleWithTag);
                    expect(store.errors.isErrorPopupOpen).toEqual(true);
                    expect(store.errors.error).toEqual(apiResponse.error);
                });
    });

    it('removes tag from article', () => {
        const draftArticleWithTag = {
            ...draftArticle,
            ...{
                tags: [tag.id]
            }
        }

        const initialState = Object.assign(initialStoreState, {
            entities: {
                articles: {
                    [draftArticleWithTag.id]: draftArticleWithTag
                },
                tags: {
                    [tag.id]: tag
                }
            }
        });

        const articleResponse: IArticleResponse = {
            article: draftArticle as IArticle,
            tags: {}
        }

        const apiResponse: IApiResponse<IArticleResponse> = {
            ok: true,
            status: 200,
            body: articleResponse
        }

        return expectSaga(watchRemoveTagFromArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(removeTagFromArticle), apiResponse]
                ])
                .put(articleActions.articleDetailsActionSuccess(articleResponse))
                .dispatch(articleActions.removeTagFromArticleRequest({
                    id: draftArticle.id,
                    data: {
                        tagId: tag.id
                    }
                }))
                .silentRun()
                .then(result => {
                    const store: RootState = result.storeState;

                    expect(store.entities.articles[draftArticle.id]).toEqual(draftArticle);
                    expect(store.articlesUi.details.processingState).toEqual(ArticleDetailsProcessingState.None);
                });
    });
});