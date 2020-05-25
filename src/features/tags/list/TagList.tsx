import React, { FunctionComponent } from 'react';

import { NoUnderlineLink } from '../../../components/Links/NoUnderlineLink';
import { ListItemContainer } from '../../../components/Lists/ListItemContainer';
import { ListLoading } from '../../../components/Lists/ListLoading/ListLoading';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';

interface ITagListProps {
    orderedTagIds: Array<string>;
    isLoading: boolean;
}

interface ITagListItemProps {
    tagId: string;
}

export const TagListItem: FunctionComponent<ITagListItemProps> = ({ tagId }) => {

    const tag = useSelector((state: RootState) => state.entities.tags[tagId]);

    return (
        <NoUnderlineLink to={`/tag-details/${tag.id}`}>
            <ListItemContainer key={tag.id}> 
                <h1>{tag.name}</h1>
                <div>{tag.description || 'no description'}</div>
            </ListItemContainer>
        </NoUnderlineLink>
    )
}

export const TagList: FunctionComponent<ITagListProps> = ({ orderedTagIds, isLoading }) => {
    
    if(isLoading) {
        return <ListLoading />
    }
    else if(orderedTagIds.length === 0) {
        return (
            <Box my={2}>
                <Alert severity='info'>
                    There are no tags
                </Alert>
            </Box>
        )
    }
    else {
        return <>
            {orderedTagIds.map(tagId => <TagListItem tagId={tagId} key={tagId} />)}
        </>
    }
}