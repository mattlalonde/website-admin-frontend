import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadTagsRequest, openCreateTagPopup } from '../tagSlice';
import { RootState } from '../../../app/store';
import { LinearProgress, Box, Button } from '@material-ui/core';
import { TagList } from './TagList';
import { CreateTagDialog } from '../create/CreateTagDialog';

export const TagListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { listResult, listInitialised, isLoading } = useSelector(
        (state: RootState) => state.tagsUi
    );

    useEffect(() => {
        if(!listInitialised) {
            dispatch(loadTagsRequest());
        }
    }, [dispatch, listInitialised]);

    const onCreateTagClick = () => {
        dispatch(openCreateTagPopup());
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
            <CreateTagDialog  />
            <TagList orderedTagIds={listResult} isLoading={isLoading} />
        </>
    )

}