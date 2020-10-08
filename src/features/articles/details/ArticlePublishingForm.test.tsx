import React from 'react';
import { render, screen, rootReducer, waitFor } from '../../../testUtils';
import initialStoreState from '../../../app/initialStoreStateTesting';
import { createStore } from 'redux';

import draftArticle from '../__mockData__/draftArticle.json';
import publishedArticle from '../__mockData__/publishedArticle.json';
import articleActions from '../articleActions';
import userEvent from '@testing-library/user-event';
import { ArticlePublishingForm } from './ArticlePublishingForm';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { IArticle } from '../models';
import { addDays, format } from 'date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

describe('Article Publishing Form', () => {

    const setup = (article: IArticle, state: ArticleDetailsProcessingState, store?: any) => {
        render(<MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ArticlePublishingForm article={article} processingState={state} />
                </MuiPickersUtilsProvider>, { store: store });
    }

    it('Displays beggining of current day if not published', () => {
        const now = new Date();
        const expectedDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0);
        const formattedDate = format(expectedDate,"dd/MM/yyyy HH:mm");

        setup(draftArticle as IArticle, ArticleDetailsProcessingState.None);

        expect(screen.getByRole('textbox', { name: "Publication date" })).toHaveDisplayValue(formattedDate);
    });

    it('Disables button when publishing', () => {
        setup(draftArticle as IArticle, ArticleDetailsProcessingState.Publishing);

        expect(screen.getByRole('button', { name: 'Publish'})).toBeDisabled();
    });

    it('Displays button to take offline when published', () => {
        setup(publishedArticle as IArticle, ArticleDetailsProcessingState.None);

        expect(screen.getByRole('button', { name: 'Take article offline'})).toBeInTheDocument();
    });

    it('Disabled button when taking article offline', () => {
        setup(publishedArticle as IArticle, ArticleDetailsProcessingState.TakingOffline);

        expect(screen.getByRole('button', { name: 'Take article offline'})).toBeDisabled();
    });

    it('Displays published message if article already live', () => {
        setup(publishedArticle as IArticle, ArticleDetailsProcessingState.None);

        const publicationDate = new Date(publishedArticle.publicationDate);
        const expectedMsg = `This article went live on ${format(publicationDate, "dd/MM/yyyy 'at' HH:mm")}`;

        expect(screen.getByText(expectedMsg)).toBeInTheDocument();
    });

    it('Displays published message if article not yet live', () => {
        const futurePublishedArticle = { ...publishedArticle, ...{ publicationDate: addDays(new Date(), 2).toISOString()}}

        setup(futurePublishedArticle as IArticle, ArticleDetailsProcessingState.None);

        const publicationDate = new Date(futurePublishedArticle.publicationDate);
        const expectedMsg = `This article will go live on ${format(publicationDate, "dd/MM/yyyy 'at' HH:mm")}`;

        expect(screen.getByText(expectedMsg)).toBeInTheDocument();
    });

    it('Dispatches action to take article offline', () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        setup(publishedArticle as IArticle, ArticleDetailsProcessingState.None, mockStore);

        userEvent.click(screen.getByRole('button', { name: 'Take article offline' }));

        expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.takeArticleOfflineRequest({ id: publishedArticle.id }));
    });

    it('Dispatches action to publish article', async () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        setup(draftArticle as IArticle, ArticleDetailsProcessingState.None, mockStore);

        const now = new Date();
        const publicationDate = addDays(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0), 2);

        const publicationDateTextField = screen.getByRole('textbox', { name: "Publication date" });
        const publishButton = screen.getByRole('button', { name: 'Publish' });

        userEvent.clear(publicationDateTextField);
        userEvent.type(publicationDateTextField, format(publicationDate, "dd/MM/yyyy HH:mm"));
        userEvent.click(publishButton);

        await waitFor(() => expect(mockStore.dispatch).toHaveBeenCalledWith(articleActions.publishArticleRequest({
            id: draftArticle.id,
            data: {
                publicationDate: format(publicationDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
            }
        })));
    });

    it('Displays an error if no date is entered when publishing', async () => {
        const mockStore = createStore(rootReducer, initialStoreState);
        mockStore.dispatch = jest.fn();

        setup(draftArticle as IArticle, ArticleDetailsProcessingState.None, mockStore);

        userEvent.clear(screen.getByRole('textbox', { name: "Publication date" }));
        userEvent.click(screen.getByRole('button', { name: 'Publish' }));

        await waitFor(() => expect(screen.getByText('Must select a date')).toBeInTheDocument());
        expect(mockStore.dispatch).not.toHaveBeenCalled();
    });
});