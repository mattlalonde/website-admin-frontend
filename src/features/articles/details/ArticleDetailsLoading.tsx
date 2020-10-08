import React, { FunctionComponent } from 'react';
import { Skeleton } from '@material-ui/lab';
import { Box } from '@material-ui/core';

export const ArticleDetailsLoading: FunctionComponent<{}> = (props) => {
    return (
        <Box data-testid='article-details-loading'>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Box my={2}>
                <Skeleton height={100} variant='rect' />
            </Box>
            <Box my={2}>
                <Skeleton height={200} variant='rect' />
            </Box>
        </Box>
    )
}