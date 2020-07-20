import React, { FunctionComponent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../../app/store';
import { TagDetailsProcessingState } from './TagDetailsProcessingState';
import tagActions from '../tagActions';
import { TagDetailsForm } from './TagDetailsForm';
import { LinearProgress } from '@material-ui/core';

interface ITagDetailsPageProps {}

export const TagDetailsPage: FunctionComponent<ITagDetailsPageProps> = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { tagDetailsProcessingState } = useSelector((state: RootState) => state.tagsUi.details);
    const tag = useSelector((state: RootState) => state.entities.tags[id]);

    const isProcessing = tagDetailsProcessingState !== TagDetailsProcessingState.None;

    useEffect(() => {
        if(!tag) {
            dispatch(tagActions.loadTagRequest(id));
        }
    }, [dispatch, id, tag]);

    return (
        <>
            { isProcessing ? <LinearProgress color='secondary' /> : null}
            { tagDetailsProcessingState === TagDetailsProcessingState.Loading ? null : 
                <h2>
                    <span>{tag?.name}</span>
                </h2>}
            <TagDetailsForm tag={tag} processingState={tagDetailsProcessingState} />
        </>
    )
}