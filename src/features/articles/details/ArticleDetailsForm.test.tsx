import React from 'react';
import { render, screen, rootReducer, waitFor } from '../../../testUtils';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { createStore } from 'redux';

import draftArticle from '../__mockData__/draftArticle.json';
import publishedArticle from '../__mockData__/publishedArticle.json';
import deletedArticle from '../__mockData__/deletedArticle.json';
import articleActions from '../articleActions';
import userEvent from '@testing-library/user-event';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { IArticle } from '../models';

import { ArticleDetailsForm } from './ArticleDetailsForm';

describe('Article Details Form', () => {

    it('Displays indicator when loading', () => {
        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.Loading} />);

        expect(screen.getByTestId('article-details-loading')).toBeInTheDocument();
    });

    it('Displays the id readonly', async () => {
        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        await waitFor(() => expect(screen.getByRole('textbox', { name: 'ID' }).hasAttribute('readonly')).toBeTruthy());
    });

    it('Does not display reinstate button for draft articles', () => {
        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        expect(screen.queryByRole('button', { name: 'Reinstate' })).not.toBeInTheDocument();
    });

    it('Displays the save button for draft articles', () => {
        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('Displays the delete button for draft articles', () => {
        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    });    

    it('Does not display the save button for published articles', () => {
        render(<ArticleDetailsForm article={publishedArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
    });

    it('Does not display the delete button for published articles', () => {
        render(<ArticleDetailsForm article={publishedArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
    });

    it('Does not display the reinstate button for published articles', () => {
        render(<ArticleDetailsForm article={publishedArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        expect(screen.queryByRole('button', { name: 'Reinstate' })).not.toBeInTheDocument();
    });

    it('Displays the reinstate button for deleted articles', () => {
        render(<ArticleDetailsForm article={deletedArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />);

        expect(screen.getByRole('button', { name: 'Reinstate' })).toBeInTheDocument();
    });  

    it('Disables buttons when updating in progress', () => {
        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.Updating} />);

        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    });

    it('Disables buttons when deleting in progress', () => {
        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.Deleting} />);

        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
        expect(screen.getByRole('button', { name: 'Delete' })).toBeDisabled();
    });

    it('Disables reinstate button when reinstating in progress', () => {
        render(<ArticleDetailsForm article={deletedArticle as IArticle} processingState={ArticleDetailsProcessingState.Reinstating} />);

        expect(screen.getByRole('button', { name: 'Reinstate' })).toBeDisabled();
    });

    it('Displays error if submitted with no title', async () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />, {
            store: mockStore
        });

        const title = screen.getByRole('textbox', { name: 'Title' });
        const save = screen.getByRole('button', { name: 'Save'});

        userEvent.clear(title);
        userEvent.click(save);

        await waitFor(() => expect(screen.getByText('Title is required')).toBeInTheDocument());
        expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

    it('Dispatches delete action when delete button clicked', () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />, {
            store: mockStore
        });

        const deleteButton = screen.getByRole('button', { name: 'Delete' });
        userEvent.click(deleteButton);

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.deleteArticleRequest({
            id: draftArticle.id
        }));
    });

    it('Dispatches the reinstate action when reinstate button clicked', () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsForm article={deletedArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />, {
            store: mockStore
        });

        const reinstateButton = screen.getByRole('button', { name: 'Reinstate' });
        userEvent.click(reinstateButton);

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.reinstateArticleRequest({
            id: deletedArticle.id
        }));
    });

    it('Dispatches the update action when update button clicked', async () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        render(<ArticleDetailsForm article={draftArticle as IArticle} processingState={ArticleDetailsProcessingState.None} />, {
            store: mockStore
        });

        const newTitle = 'new title';
        const newPrecis = 'new precis';
        const newBody = 'new body';

        const title = screen.getByRole('textbox', { name: 'Title'});
        const precis = screen.getByRole('textbox', { name: 'Precis' });
        const body = screen.getByRole('textbox', { name: 'Body' });

        userEvent.clear(title);
        userEvent.type(title, newTitle);

        userEvent.clear(precis);
        userEvent.type(precis, newPrecis);

        userEvent.clear(body);
        userEvent.type(body, newBody);

        const saveButton = screen.getByRole('button', { name: 'Save' });
        userEvent.click(saveButton);

        await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.updateArticleContentRequest({
            id: draftArticle.id,
            data: {
                title: newTitle,
                precis: newPrecis,
                body: newBody
            }
        })));
    });
});