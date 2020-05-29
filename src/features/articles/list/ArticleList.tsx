import React, { FunctionComponent, useEffect } from 'react';

import { ListLoading } from '../../../components/Lists/ListLoading/ListLoading';
import { Alert } from '@material-ui/lab';
import { ListItemContainer } from '../../../components/Lists/ListItemContainer';
import { NoUnderlineLink } from '../../../components/Links/NoUnderlineLink';
import { Box } from '@material-ui/core';
import { RootState } from '../../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { ArticleTag } from '../components/ArticleTag';
import articleActions from '../articleActions';

interface IArticleListProps {
    orderedArticleIds: Array<string>;
    isLoading: boolean;
}

interface IArticleListItemProps {
    articleId: string;
}

export const ArticleListItem: FunctionComponent<IArticleListItemProps> = ({ articleId }) => {

    const dispatch = useDispatch();
    const article = useSelector((state: RootState) => state.entities.articles[articleId]);

    useEffect(() => {
        if(!article) {
            dispatch(articleActions.loadArticleRequest(articleId));
        }
    })


    return (
        <NoUnderlineLink to={`/article-details/${article.id}`}>
            <ListItemContainer key={article.id}> 
                <h1>{article.title}</h1>
                <Box m={2}>{article.precis || 'no precis'}</Box>
                <Box mt={2}>
                    {article && article.tags && article.tags.map(tagId => {
                        return <ArticleTag articleId={article.id} tagId={tagId} key={tagId} removable={false} />
                    })}
                </Box>
            </ListItemContainer>
        </NoUnderlineLink>
    )
}

export const ArticleList: FunctionComponent<IArticleListProps> = ({ orderedArticleIds, isLoading }) => {

    if(isLoading) {
        return <ListLoading />
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