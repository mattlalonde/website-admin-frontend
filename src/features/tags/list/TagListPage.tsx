import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadTagsRequest } from './tagListSlice';
import { RootState } from '../../../app/store';
import { LinearProgress, Box, Button } from '@material-ui/core';
import { TagList } from './TagList';
import { setCreateTagPopupVisibility, createTagRequest } from '../create/tagCreateSlice';
import { ICreateTagRequest } from '../apiRequests';
import { CreateTagDialog } from '../create/CreateTagDialog';

export const TagListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { tags, isLoading } = useSelector(
        (state: RootState) => state.tagList
    );

    const { isTagCreatePopupOpen, isCreatingTag } = useSelector(
        (state: RootState) => state.tagCreate
    );

    useEffect(() => {
        dispatch(loadTagsRequest());
    }, [dispatch]);

    const onCreateTagClick = () => {
        dispatch(setCreateTagPopupVisibility(true));
    }

    const onCloseCreateTagPopup = () => {
        dispatch(setCreateTagPopupVisibility(false));
    }

    const onSubmitCreateTag = (content: ICreateTagRequest) => {
        dispatch(createTagRequest(content));
    }

    return (
        <>
            {isLoading && <LinearProgress color='secondary' />}
            <Box my={2}>
                <Button
                    variant='contained'
                    color='primary'
                    fullWidth={true}
                    onClick={onCreateTagClick}>
                        Create New Tag
                </Button>
            </Box>
            <CreateTagDialog
                handleClose={onCloseCreateTagPopup}
                onSubmit={onSubmitCreateTag}
                isPopupOpen={isTagCreatePopupOpen}
                isCreating={isCreatingTag} />
            <TagList tags={tags} isLoading={isLoading} />
        </>
    )

}