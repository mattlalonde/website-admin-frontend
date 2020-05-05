import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

interface IListLoadingProps {
    itemHeight?: number;
    itemCount?: number;
}

const defaultProps: IListLoadingProps = {
    itemHeight: 120,
    itemCount: 3
}

export const ListLoading: FunctionComponent<IListLoadingProps> = (props: IListLoadingProps) => {

    const config = {...defaultProps, ...props};

    return <>
        {[...Array(config.itemCount)].map((_, idx) => {
            return <Box my={2} key={idx}>
                    <Skeleton variant='rect' height={config.itemHeight} />
                </Box>
        })}
    </>
}