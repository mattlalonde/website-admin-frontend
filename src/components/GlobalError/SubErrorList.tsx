import React, { FunctionComponent } from 'react';
import { IApiSubErrorData, IValidationError } from '../../errors/ApiError';

interface ISubErrorListProps {
    subErrors: Array<IApiSubErrorData>;
}

const ValidationError: FunctionComponent<{error: IValidationError}> = ({error}) => {
    return <li>
        {error.message}
    </li>
}

const UnKnownError: FunctionComponent<{error: IApiSubErrorData}> = ({error}) => {
    return <li>
        Unrecognised error type: {error.type}
    </li>
}

export const SubErrorList: FunctionComponent<ISubErrorListProps> = ({subErrors}) => {

    return (
        <ul>
            {subErrors.map((error, index) => {
                switch(error.type) {
                    case 'ValidationError':
                        return <ValidationError key={index} error={error as IValidationError} />
                    default:
                        return <UnKnownError key={index} error={error} />
                }
            })}
        </ul>
    );
}