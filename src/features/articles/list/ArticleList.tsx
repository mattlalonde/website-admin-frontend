import React, { FunctionComponent } from 'react';

import { ListLoading } from '../../../components/Lists/ListLoading/ListLoading';
import { Alert } from '@material-ui/lab';
import { Box } from '@material-ui/core';

import { ArticleListItem } from './ArticleListItem';
 
interface IArticleListProps {
    orderedArticleIds: Array<string>;
    isLoading: boolean;
}

export const ArticleList: FunctionComponent<IArticleListProps> = ({ orderedArticleIds, isLoading }) => {

    if(isLoading) {
        return <ListLoading data-testid='article-list-loader' />
    }
    else if(orderedArticleIds.length === 0) {
        return (
            <Box my={2}>
                <Alert severity='info'>
                    There are no articles
                </Alert>
            </Box>
        )
    }
    else {
        return <>
            {orderedArticleIds.map(id => <ArticleListItem articleId={id} key={id} />)}
        </>
    }
}