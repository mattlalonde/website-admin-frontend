import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadArticlesRequest } from './articleListSlice';
import { RootState } from '../../../app/store';
import { ArticleList } from './ArticleList';
import { setCreateArticlePopupVisibility, createArticleRequest } from '../create/articleCreateSlice';
import { Button, LinearProgress, Box } from '@material-ui/core';
import { CreateArticleDialog } from '../create/CreateArticleDialog';
import { ICreateArticleRequest } from '../apiRequests';

export const ArticleListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { entities, result, isLoading } = useSelector(
        (state: RootState) => state.articleList
    );

    const { isPopupOpen, isCreating, createArticleServerError } = useSelector(
        (state: RootState) => state.articleCreate
    );

    useEffect(() => {
        dispatch(loadArticlesRequest());
    }, [dispatch]);

    const onCreateArticleClick = () => {
        dispatch(setCreateArticlePopupVisibility(true));
    }

    const onCloseCreateArticlePopup = () => {
        dispatch(setCreateArticlePopupVisibility(false));
    }

    const onSubmitCreateArticle = (content: ICreateArticleRequest) => {
        dispatch(createArticleRequest(content));
    }

    return (
        <>
            {isLoading && <LinearProgress color='secondary' />}
            <Box my={2}>
                <Button
                    variant='contained' 
                    color='primary' 
                    fullWidth={true}
                    onClick={onCreateArticleClick}>
                            Create New Article
                </Button>
            </Box>
            <CreateArticleDialog 
                handleClose={onCloseCreateArticlePopup} 
                onSubmit={onSubmitCreateArticle}
                isPopupOpen={isPopupOpen}
                isCreating={isCreating}
                createArticleServerError={createArticleServerError} />
            <ArticleList entities={entities} orderedArticleIds={result} isLoading={isLoading} />
        </>
    )
}


