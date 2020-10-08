import React, { FunctionComponent, useEffect } from 'react';
import { ListItemContainer } from '../../../components/Lists/ListItemContainer';
import { NoUnderlineLink } from '../../../components/Links/NoUnderlineLink';
import { Box } from '@material-ui/core';
import { RootState } from '../../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { ArticleTag } from '../components/ArticleTag';
import articleActions from '../articleActions';
import { articleDetailsLink } from '../articleLinks';

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

    if(!article) return null;

    return (
        <NoUnderlineLink to={articleDetailsLink(article)}>
            <ListItemContainer key={article.id}> 
                <h1>{article.title}</h1>
                <Box m={2}>{article.precis || 'no precis'}</Box>
                <Box mt={2}>
                    {article?.tags?.map(tagId => {
                        return <ArticleTag articleId={article.id} tagId={tagId} key={tagId} removable={false} />
                    })}
                </Box>
            </ListItemContainer>
        </NoUnderlineLink>
    )
}