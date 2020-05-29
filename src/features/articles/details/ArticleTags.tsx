import React, { FunctionComponent } from 'react';
import { Box } from '@material-ui/core';
import { IArticle } from '../models';
import { useDispatch } from 'react-redux';
import { ArticleDetailsProcessingState } from './ArticleDetailsProcessingState';
import { AddTagToContent } from '../../tags/addTagToContent/AddTagToContent';
import { ArticleTag } from '../components/ArticleTag';
import articleActions from '../articleActions';

interface IArticleTagsProps {
    article: IArticle;
    processingState: ArticleDetailsProcessingState;
}

export const ArticleTags: FunctionComponent<IArticleTagsProps> = ({article, processingState}) => {

    const dispatch = useDispatch();

    const onAddTag = (tagId: string) => {
        if(article) {
            dispatch(articleActions.addTagToArticleRequest({
                id: article.id,
                data: {
                    tagId: tagId
                }
            }));
        }
    }

    const currentTagIds = article.tags || [];
    const editable = article.state === 'DRAFT';

    return (
        <>
            {editable && 
                <>
                    <AddTagToContent addTagFunc={onAddTag} isAdding={processingState === ArticleDetailsProcessingState.AddingTag} excludeIds={currentTagIds} />
                    <hr />
                </>
            }
            
            <Box my={2}>
                <strong>Current tags:</strong>
            </Box>
            <Box my={2}>
                {currentTagIds.map(tagId => <ArticleTag tagId={tagId} articleId={article.id} key={`${article.id}-${tagId}`} removable={editable} />)}
            </Box>
        </>
    )
}

