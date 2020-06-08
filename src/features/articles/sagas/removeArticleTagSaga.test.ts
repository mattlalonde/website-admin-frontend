import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchRemoveTagFromArticleSaga } from './removeArticleTagSaga';
import { removeTagFromArticle } from '../api';
import createRootReducer from '../../../app/rootReducer'; 
import articleActions from '../articleActions';
import * as errors from '../../errors/errorsSlice';
import { RootState } from '../../../app/store';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { ApiError } from '../../../errors/ApiError';
import { throwError } from 'redux-saga-test-plan/providers';
import draftArticle from '../__mockData__/draftArticle.json';
import tag from '../__mockData__/tag.json';
import { IArticle, IArticleResponse } from '../models';
import { ArticleDetailsProcessingState } from '../details/ArticleDetailsProcessingState';

describe('remove article tag saga', () => {
    it('puts failed action on error and updates store', () => {
        const error = ApiError.create('test error', 'something went wrong');

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
                    [matchers.call.fn(removeTagFromArticle), throwError(error)]
                ])
                .put(articleActions.articleDetailsActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
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
                    expect(store.errors.error).toEqual(error.apiErrorData);
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

        return expectSaga(watchRemoveTagFromArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(removeTagFromArticle), articleResponse]
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