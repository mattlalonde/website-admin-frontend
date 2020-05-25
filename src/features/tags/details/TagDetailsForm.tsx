import React, { FunctionComponent } from 'react';
import { useForm } from "react-hook-form";

import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { ITag } from '../models';
import { TagDetailsProcessingState } from './TagDetailsProcessingState';
import { useDispatch } from 'react-redux';
import { updateTagRequest } from '../tagSlice';
import { TagDetailsLoading } from './TagDetailsLoading';

interface ITagDetailsFormValues {
    id: string,
    name: string,
    description: string
}

interface ITagDetailsFormProps {
    tag: ITag | null,
    processingState: TagDetailsProcessingState
}

export const TagDetailsForm: FunctionComponent<ITagDetailsFormProps> = ({ tag, processingState }) => {

    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<ITagDetailsFormValues>();
    const isProcessing = processingState !== TagDetailsProcessingState.None;

    const onUpdate = handleSubmit(content => {
        dispatch(updateTagRequest({
            id: content.id,
            data: {
                name: content.name,
                description: content.description
            }
        }));
    });

    if(!tag || processingState === TagDetailsProcessingState.Loading) {
        return <TagDetailsLoading />
    }

    return (
        <form noValidate autoComplete='off' onSubmit={onUpdate}>
            <Box my={2}>
                <TextField 
                    inputRef={register({ required: true })}
                    error={!!errors.id}
                    id="id" 
                    name="id" 
                    label="ID" 
                    fullWidth={true} 
                    defaultValue={tag?.id} 
                    variant='outlined'
                    InputProps={{readOnly: true}}>
                </TextField>
            </Box>
            <Box my={2}>
                <TextField 
                    inputRef={register({ required: true })}
                    error={!!errors.name}
                    id="name" 
                    name="name" 
                    label="Name" 
                    fullWidth={true} 
                    defaultValue={tag?.name} 
                    variant='outlined'
                    helperText={!!errors.name ? "Name is required" : ''}>
                </TextField>
            </Box>
            <Box my={2}>
                <TextField 
                    inputRef={register}
                    id="description" 
                    name="description" 
                    label="Description" 
                    fullWidth={true} 
                    multiline={true} 
                    rows={4} 
                    defaultValue={tag?.description} 
                    variant='outlined'>
                </TextField>
            </Box>
            <Box my={2}>
                <Button 
                    type='submit'
                    variant='contained' 
                    color='primary' 
                    startIcon={processingState === TagDetailsProcessingState.Updating ? <CircularProgress size={20} /> : <SaveIcon />} 
                    disabled={isProcessing}>
                        Save
                </Button>
            </Box>
        </form>
    )
}