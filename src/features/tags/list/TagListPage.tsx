import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import tagActions from '../tagActions';
import { RootState } from '../../../app/store';
import { LinearProgress, Box, Button } from '@material-ui/core';
import { TagList } from './TagList';
import { CreateTagDialog } from '../create/CreateTagDialog';

export const TagListPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { listResult, listInitialised, isLoading } = useSelector(
        (state: RootState) => state.tagsUi.list
    );

    useEffect(() => {
        if(!listInitialised) {
            dispatch(tagActions.loadTagsRequest());
        }
    }, [dispatch, listInitialised]);

    const onCreateTagClick = () => {
        dispatch(tagActions.openCreateTagPopup());
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