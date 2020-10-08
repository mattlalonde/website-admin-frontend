import React from 'react';
import { render, screen, waitFor } from '../../../testUtils';
import userEvent from '@testing-library/user-event';
import { ICreateArticleRequest } from '../apiRequests';

import { CreateArticleDialog } from './CreateArticleDialog';

describe('CreateArticleDialog', () => {
    let handleCloseMock = jest.fn();
    let onSubmitMock = jest.fn();

    beforeEach(() => jest.resetAllMocks());


    it('Displays dialog when passed open property', () => {
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={true} isCreating={false} />);

        const dialog = screen.queryByRole('dialog');
        expect(dialog).toBeVisible();
    });

    it('Hides the dialog when the open property is false', () => {
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={false} isCreating={false} />);

        const dialog = screen.queryByRole('dialog');
        expect(dialog).not.toBeInTheDocument();
    });

    it('Closes dialog on cancel', async () => {
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={true} isCreating={false} />);

        const closeButton = screen.getByRole('button', { name: 'Cancel' });
        userEvent.click(closeButton);

        await waitFor(() => expect(handleCloseMock).toBeCalledTimes(1));
    });

    it('Disables create button while creating in progress', () => {
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={true} isCreating={true} />);

        expect(screen.getByRole('button', { name: 'Create' })).toBeDisabled();
    });

    it('Displays string error', () => {
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={true} isCreating={false} createArticleServerError='test error' />);

        expect(screen.getByText('test error')).toBeInTheDocument();
    });

    it('Displays object error', () => {
        const error = new Error('test object error');
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={true} isCreating={false} createArticleServerError={error} />);

        expect(screen.getByText('test object error')).toBeInTheDocument();
    });

    it('Displays error if create pressed with no title', async () => {
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={true} isCreating={false} />);

        const createButton = screen.getByRole('button', { name: 'Create' });

        userEvent.click(createButton);
        
        const errorMsg = await screen.findByText('Title is required');
        expect(errorMsg).toBeInTheDocument();
    });

    it('Submits form with valid title', async () => {
        render(<CreateArticleDialog handleClose={handleCloseMock} onSubmit={onSubmitMock} isPopupOpen={true} isCreating={false} />);

        const testTitle = 'test title';
        const createButton = screen.getByRole('button', { name: 'Create' });
        const title = screen.getByRole('textbox', { name: "Title" });
        
        userEvent.type(title, testTitle);
        userEvent.click(createButton);

        const expectedResult: ICreateArticleRequest = {
            title: testTitle
        };
        await waitFor(() => expect(screen.queryByText('Title is required')).not.toBeInTheDocument());
        expect(onSubmitMock).toHaveBeenCalledWith(expectedResult)
    });
});