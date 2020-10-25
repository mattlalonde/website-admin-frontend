import React from 'react';
import { action } from '@storybook/addon-actions';

import { ErrorDialog } from './ErrorDialog';
import { IErrorData } from '../models';

export default {
    component: ErrorDialog,
    title: 'Error Dialog'
}

export const Default = () => {
    const error: IErrorData = {
        type: 'ApiError',
        message: "Article was not found for parameters {id=e3dc3088-b0c2-4684-9bc3-c3700314001e}"
    }

    return <ErrorDialog
                open={true}
                handleClose={action('handle close')}
                error={error}>
            </ErrorDialog>
}

export const ValidationErrors = () => {
    const error: IErrorData = {
        type: 'ApiError',
        message: "Validation error",
        subErrors: [
            {
                type: 'ValidationError',
                message: "Article must have a body to publish"
            },
            {
                type: 'ValidationError',
                message: "Article must have a precis to publish"
            }
        ]
    }

    return <ErrorDialog
                open={true}
                handleClose={action('handle close')}
                error={error}>
            </ErrorDialog>
}