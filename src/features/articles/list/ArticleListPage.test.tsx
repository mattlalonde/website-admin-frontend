import React from 'react';
import { createStore } from 'redux';
import { render, screen, rootReducer, waitFor } from '../../../testUtils';
import { ArticleListPage } from './ArticleListPage';

import initialStoreState from '../../../app/initialStoreStateTesting';
import articleList from '../__mockData__/list.json';
import articleActions from '../articleActions';
import userEvent from '@testing-library/user-event';
import { ICreateArticleRequest } from '../apiRequests';


describe('Article List Page', () => {

    it('Displays progress bar when loading', () => {
        const mockState = Object.assign(initialStoreState, {
            articlesUi: {
                list: {
                    result: [],
                    isLoading: true
                }
            }
        });

        render(<ArticleListPage />, {
            initialState: mockState
        });

        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('Dispatches request to load articles', () => {
        const mockState = Object.assign(initialStoreState, {
            entities: articleList.entities,
            articlesUi: {
                list: {
                    result: [],
                    isLoading: false
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleListPage />, {
            store: mockStore
        });

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.loadArticlesRequest());
    });

    it('Dispatches request to create new article when button pressed', () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        render(<ArticleListPage />, {
            store: mockStore
        });

        userEvent.click(screen.getByRole('button', { name: 'Create New Article'}));

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.openCreateArticlePopup());
    });

    it('Dispatches close create popup action when popup canceled', () => {
        const mockState = Object.assign(initialStoreState, {
            articlesUi: {
                create: {
                    isPopupOpen: true
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleListPage />, {
            store: mockStore
        });

        const closeButton = screen.getByRole('button', { name: 'Cancel' });
        userEvent.click(closeButton);

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.closeCreateArticlePopup());
    });

    it('Dispatches action to create new article', async () => {
        const mockState = Object.assign(initialStoreState, {
            articlesUi: {
                create: {
                    isPopupOpen: true
                }
            }
        });
        const mockStore = createStore(rootReducer, mockState);
        mockStore.dispatch = jest.fn();

        render(<ArticleListPage />, {
            store: mockStore
        });

        const testTitle = 'test title';
        const createButton = screen.getByRole('button', { name: 'Create' });
        const title = screen.getByRole('textbox', { name: "Title" });

        userEvent.type(title, testTitle);
        userEvent.click(createButton);

        const createRequest: ICreateArticleRequest = {
            title: testTitle
        };

        await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.createArticleRequest(createRequest)));
    });
});