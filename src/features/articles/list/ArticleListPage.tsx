import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../app/store';
import { ArticleList } from './ArticleList';
import { Button, LinearProgress, Box } from '@material-ui/core';
import { CreateArticleDialog } from '../create/CreateArticleDialog';
import { ICreateArticleRequest } from '../apiRequests';
import articleActions from '../articleActions';

export const ArticleListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { result, isLoading } = useSelector((state: RootState) => state.articlesUi.list);
    const { isPopupOpen, isCreating, createArticleServerError } = useSelector((state: RootState) => state.articlesUi.create);

    useEffect(() => {
        dispatch(articleActions.loadArticlesRequest());
    }, [dispatch]);

    const onCreateArticleClick = () => {
        dispatch(articleActions.openCreateArticlePopup());
    }

    const onCloseCreateArticlePopup = () => {
        dispatch(articleActions.closeCreateArticlePopup());
    }

    const onSubmitCreateArticle = (content: ICreateArticleRequest) => {
        dispatch(articleActions.createArticleRequest(content));
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
            <ArticleList orderedArticleIds={result} isLoading={isLoading} />
        </>
    )
}


