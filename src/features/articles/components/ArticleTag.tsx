import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import articleActions from '../articleActions';
import tagActions from '../../tags/tagActions';
import { Chip } from '@material-ui/core';
import { getTagById } from '../../../entities/tagEntitySelectors';

interface IArticleTagProps {
    articleId: string;
    tagId: string;
    removable: boolean
}

export const ArticleTag: FunctionComponent<IArticleTagProps> = ({articleId, tagId, removable}) => {
    const dispatch = useDispatch();
    const tag = useSelector(getTagById(tagId));

    const onRemoveTag = (tagId: string) => {
        dispatch(articleActions.removeTagFromArticleRequest({
            id: articleId,
            data: {
                tagId: tagId
            }
        }));
    }

    useEffect(() => {
        if(!tag){
            dispatch(tagActions.loadTagRequest(tagId));
        }
    }, [dispatch, tagId, tag]);

    if(tag && removable) {
        return <Chip label={tag.name} color='primary' key={tagId} onDelete={() => { onRemoveTag(tagId); }} />
    }
    else if(tag && !removable) {
        return <Chip label={tag.name} color='primary' key={tagId} />
    }

    return null;
}