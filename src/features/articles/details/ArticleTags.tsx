import React, { FunctionComponent } from 'react';
import { Box, Chip } from '@material-ui/core';
import { IArticleTag, IArticle } from '../models';
import { useDispatch } from 'react-redux';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { addTagToArticleRequest, removeTagFromArticleRequest } from './articleDetailsSlice';
import { AddTagToContent } from '../../tags/addTagToContent/AddTagToContent';

interface IArticleTagsProps {
    article: IArticle | null;
    tags: Array<IArticleTag>;
    processingState: ArticleDetailsProcessingState;
}

export const ArticleTags: FunctionComponent<IArticleTagsProps> = ({article, tags, processingState}) => {

    const dispatch = useDispatch();

    const onAddTag = (tagId: string) => {
        if(article) {
            dispatch(addTagToArticleRequest({
                id: article.id,
                data: {
                    tagId: tagId
                }
            }));
        }
    }

    const onRemoveTag = (tagId: string) => {
        if(article) {
            dispatch(removeTagFromArticleRequest({
                id: article.id,
                data: {
                    tagId: tagId
                }
            }));
        }
    }

    const currentTagIds = tags.map(tag => tag.tagId);

    return (
        <>
            <AddTagToContent addTagFunc={onAddTag} isAdding={processingState === ArticleDetailsProcessingState.AddingTag} excludeIds={currentTagIds} />
            <hr />
            <Box my={2}>
                <strong>Current tags:</strong>
            </Box>
            <Box my={2}>
                {tags.map(tag => <Chip label={tag.name} color='primary' onDelete={() => { onRemoveTag(tag.tagId); }} />)}
            </Box>
        </>
    )
}

