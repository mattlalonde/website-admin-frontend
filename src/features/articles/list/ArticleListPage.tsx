import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadArticlesRequest } from './articleListSlice';
import { RootState } from '../../../app/store';
import { ArticleList } from './ArticleList';
import { setCreateArticlePopupVisibility, createArticleRequest } from '../create/articleCreateSlice';
import { Button, LinearProgress, Box } from '@material-ui/core';
import { CreateArticleDialog } from '../create/CreateArticleDialog';
import { ICreateArticleRequest } from '../models';

export const ArticleListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { articles, isLoading, error } = useSelector(
        (state: RootState) => state.articleList
    );

    const { isPopupOpen, isCreating, createArticleServerError } = useSelector(
        (state: RootState) => state.articleCreate
    );

    useEffect(() => {
        if(!articles.length) {
            dispatch(loadArticlesRequest());
        }
    }, [dispatch, articles]);

    const onCreateArticleClick = () => {
        dispatch(setCreateArticlePopupVisibility(true));
    }

    const onCloseCreateArticlePopup = () => {
        dispatch(setCreateArticlePopupVisibility(false));
    }

    const onSubmitCreateArticle = (content: ICreateArticleRequest) => {
        dispatch(createArticleRequest(content));
    }

    if(error) {
        return (<div>error: {error}</div>)
    }

    return (
        <>
            {isLoading ? <LinearProgress color='secondary' /> : null}
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
            <ArticleList articles={articles} isLoading={isLoading} />
        </>
    )
}


