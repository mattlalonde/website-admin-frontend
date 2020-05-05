import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../../app/store';
import { TagDetailsProcessingState } from './TagDetailsProcessingState';
import { loadTagRequest } from './tagDetailsSlice';
import { TagDetailsForm } from './TagDetailsForm';
import { LinearProgress } from '@material-ui/core';

interface ITagDetailsPageProps {}

export const TagDetailsPage: FunctionComponent<ITagDetailsPageProps> = (props) => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { tagDetailsProcessingState, loadedTag } = useSelector(
        (state: RootState) => state.tagDetails
    );

    const isProcessing = tagDetailsProcessingState !== TagDetailsProcessingState.None;

    useEffect(() => {
        if(loadedTag?.id !== id) {
            dispatch(loadTagRequest(id));
        }
    }, [dispatch, id, loadedTag]);

    return (
        <>
            { isProcessing ? <LinearProgress color='secondary' /> : null}
            { tagDetailsProcessingState === TagDetailsProcessingState.Loading ? null : 
                <h2>
                    <span>{loadedTag?.name}</span>
                </h2>}
            <TagDetailsForm tag={loadedTag} processingState={tagDetailsProcessingState} />
        </>
    )
}