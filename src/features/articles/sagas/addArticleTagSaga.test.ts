import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { watchAddTagToArticleSaga } from './addArticleTagSaga';
import { addTagToArticle } from '../api';
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

describe('add article tag saga', () => {

    it('puts failed action on error and updates store', () => {
        const error = ApiError.create('test error', 'something went wrong');

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
                    [matchers.call.fn(addTagToArticle), throwError(error)]
                ])
                .put(articleActions.articleDetailsActionFailed(error.apiErrorData))
                .put(errors.setError(error.apiErrorData))
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
                    expect(store.errors.error).toEqual(error.apiErrorData);
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

        return expectSaga(watchAddTagToArticleSaga)
                .withReducer(createRootReducer())
                .withState(initialState)
                .provide([
                    [matchers.call.fn(addTagToArticle), articleResponse]
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