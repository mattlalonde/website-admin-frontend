import React, { FunctionComponent } from 'react';

import { IArticleListItem } from '../models';
import { ListLoading } from '../../../components/Lists/ListLoading/ListLoading';
import { Alert } from '@material-ui/lab';
import { ListItemContainer } from '../../../components/Lists/ListItemContainer';
import { NoUnderlineLink } from '../../../components/Links/NoUnderlineLink';
import { Box } from '@material-ui/core';

interface IArticleListProps {
    articles: Array<IArticleListItem>;
    isLoading: boolean;
}

interface IArticleListItemProps {
    article: IArticleListItem;
}

export const ArticleListItem: FunctionComponent<IArticleListItemProps> = ({ article }) => {
    return (
        <NoUnderlineLink to={`/article-details/${article.id}`}>
            <ListItemContainer key={article.id}> 
                <h1>{article.title}</h1>
                <div>{article.precis || 'no precis'}</div>
            </ListItemContainer>
        </NoUnderlineLink>
    )
}

export const ArticleList: FunctionComponent<IArticleListProps> = ({ articles, isLoading }) => {

    if(isLoading) {
        return <ListLoading />
    }
    else if(articles.length === 0) {
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
            {articles.map(article => <ArticleListItem article={article} key={article.id} />)}
        </>
    }
}