import React, { FunctionComponent } from 'react';

import { IArticleListItem, IArticleTag } from '../models';
import { ListLoading } from '../../../components/Lists/ListLoading/ListLoading';
import { Alert } from '@material-ui/lab';
import { ListItemContainer } from '../../../components/Lists/ListItemContainer';
import { NoUnderlineLink } from '../../../components/Links/NoUnderlineLink';
import { Box, Chip } from '@material-ui/core';

interface IArticleListProps {
    entities: {
        articles: Record<string, IArticleListItem>;
        tags: Record<string, IArticleTag>;
    }
    orderedArticleIds: Array<string>;
    isLoading: boolean;
}

interface IArticleListItemProps {
    article: IArticleListItem;
    tags: Record<string, IArticleTag>;
}

export const ArticleListItem: FunctionComponent<IArticleListItemProps> = ({ article, tags }) => {
    return (
        <NoUnderlineLink to={`/article-details/${article.id}`}>
            <ListItemContainer key={article.id}> 
                <h1>{article.title}</h1>
                <Box m={2}>{article.precis || 'no precis'}</Box>
                <Box mt={2}>
                    {article.tags.map(tagId => {
                        return <Chip color='primary' label={tags[tagId].name} />
                    })}
                </Box>
            </ListItemContainer>
        </NoUnderlineLink>
    )
}

export const ArticleList: FunctionComponent<IArticleListProps> = ({ entities, orderedArticleIds, isLoading }) => {

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
            {orderedArticleIds.map(id => <ArticleListItem article={entities.articles[id]} tags={entities.tags} key={id} />)}
        </>
    }
}