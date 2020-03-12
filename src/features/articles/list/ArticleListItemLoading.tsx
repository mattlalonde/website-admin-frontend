import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

export const ArticleListItemLoading: FunctionComponent<{}> = (props) => {


    return (
            <Box my={2}>
                <Skeleton variant='rect' height={120} />
            </Box>
    )
}