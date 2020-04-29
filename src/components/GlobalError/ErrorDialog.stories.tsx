import React from 'react';
import { action } from '@storybook/addon-actions';

import { ErrorDialog } from './ErrorDialog';
import { IApiErrorData } from '../../errors/ApiError';

export default {
    component: ErrorDialog,
    title: 'Error Dialog'
}

export const Default = () => {
    const error = {
        apierror: {
            "status": "NOT_FOUND",
            "timestamp": "17-04-2020 04:36:27",
            "message": "Article was not found for parameters {id=e3dc3088-b0c2-4684-9bc3-c3700314001e}",
            "debugMessage": null,
            "subErrors": null
        }
    }

    return <ErrorDialog
                open={true}
                handleClose={action('handle close')}
                error={error}>
            </ErrorDialog>
}

export const ErrorWithDebugMessage = () => {
    const error = {
        apierror: {
            "status": "NOT_FOUND",
            "timestamp": "17-04-2020 04:36:27",
            "message": "Article was not found for parameters {id=e3dc3088-b0c2-4684-9bc3-c3700314001e}",
            "debugMessage": "Debug message returned from the server",
            "subErrors": null
        }
    }

    return <ErrorDialog
                open={true}
                handleClose={action('handle close')}
                error={error}>
            </ErrorDialog>
}

export const ValidationErrors = () => {
    const error = {
        apierror: {
            "status": "BAD_REQUEST",
            "timestamp": "17-04-2020 04:36:27",
            "message": "Validation error",
            "debugMessage": null,
            "subErrors": [
                {
                    "type": 'ValidationError',
                    "field": "body",
                    "message": "Article must have a body to publish",
                    "rejectedValue": null
                },
                {
                    "type": 'ValidationError',
                    "field": "precis",
                    "message": "Article must have a precis to publish",
                    "rejectedValue": null
                }
            ]
        }
    }

    return <ErrorDialog
                open={true}
                handleClose={action('handle close')}
                error={error as IApiErrorData}>
            </ErrorDialog>
}