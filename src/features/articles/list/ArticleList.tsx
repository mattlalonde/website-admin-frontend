import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { IArticleListItem } from '../models';
import { Paper, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { ArticleListItemLoading } from './ArticleListItemLoading';
import { Alert } from '@material-ui/lab';

const ArticleListItemContainer = styled(Paper)({
    padding: '1em',
    margin: '1em 0 1em 0',
    cursor: 'pointer',
    border: 'solid 1px transparent',
    transition: 'all .1s',
    '&:hover': {
        backgroundColor: '#fdfdfd',
        boxShadow: 'none',
        border: 'solid 1px #dddddd'
    }
});

const NoUnderlineLink = styled(Link)({
    textDecoration: 'none'
});


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
            <ArticleListItemContainer key={article.id}> 
                <h1>{article.title}</h1>
                <div>{article.precis || 'no precis'}</div>
            </ArticleListItemContainer>
        </NoUnderlineLink>
    )
}

export const ArticleList: FunctionComponent<IArticleListProps> = ({ articles, isLoading }) => {

    if(isLoading) {
        return (
            <>
                <ArticleListItemLoading />
                <ArticleListItemLoading />
                <ArticleListItemLoading />
            </>
        )
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