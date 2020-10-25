import React, { FunctionComponent } from 'react';
import { ISubErrorData } from '../models';

interface ISubErrorListProps {
    subErrors: Array<ISubErrorData>;
}

export const SubErrorList: FunctionComponent<ISubErrorListProps> = ({subErrors}) => {

    return (
        <ul>
            {subErrors.map((error, index) => (
                    <li>
                        <strong>{error.type}</strong> {error.message}
                    </li>
                )
            )}
        </ul>
    );
}