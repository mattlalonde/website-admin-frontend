import React, { FunctionComponent } from 'react';
import { Skeleton } from '@material-ui/lab';

export const TagDetailsLoading: FunctionComponent<{}> = (props) => {
    return (
        <>
            <Skeleton height={50} />
            <Skeleton height={50} />
            <Skeleton height={100} />
        </>
    )
}