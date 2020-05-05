import React, { FunctionComponent } from 'react';

import { ITag } from '../models';
import { NoUnderlineLink } from '../../../components/Links/NoUnderlineLink';
import { ListItemContainer } from '../../../components/Lists/ListItemContainer';
import { ListLoading } from '../../../components/Lists/ListLoading/ListLoading';
import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

interface ITagListProps {
    tags: Array<ITag>;
    isLoading: boolean;
}

interface ITagListItemProps {
    tag: ITag;
}

export const TagListItem: FunctionComponent<ITagListItemProps> = ({ tag }) => {
    return (
        <NoUnderlineLink to={`/tag-details/${tag.id}`}>
            <ListItemContainer key={tag.id}> 
                <h1>{tag.name}</h1>
                <div>{tag.description || 'no description'}</div>
            </ListItemContainer>
        </NoUnderlineLink>
    )
}

export const TagList: FunctionComponent<ITagListProps> = ({ tags, isLoading }) => {
    
    if(isLoading) {
        return <ListLoading />
    }
    else if(tags.length === 0) {
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
            {tags.map(tag => <TagListItem tag={tag} key={tag.id} />)}
        </>
    }
}