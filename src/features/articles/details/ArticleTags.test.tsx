import React from 'react';
import { render, screen, waitFor, rootReducer } from '../../../testUtils';
import { ArticleTags } from './ArticleTags';
import { createStore } from 'redux';

import initialStoreState from '../../../app/initialStoreStateTesting';
import articleList from '../__mockData__/list.json';
import { IArticle } from '../models';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';

describe('Article Tags', () => {

    it('Displays all tags from article', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: articleList.entities
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        const testArticle: IArticle = articleList.entities.articles[Object.keys(articleList.entities.articles)[0]];


        render(<ArticleTags article={testArticle} processingState={ArticleDetailsProcessingState.None} />, {
            store: mockStore
        });

        testArticle.tags?.forEach(tagId => {
            expect(screen.getByText(articleList.entities.tags[tagId].name)).toBeInTheDocument();
        })
    });
});