import React, { FunctionComponent } from 'react';
import { DialogContent, Dialog, DialogTitle, TextField, Button, CircularProgress, DialogActions, Box } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import SaveIcon from '@material-ui/icons/Save';
import { ICreateTagRequest } from '../apiRequests';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import tagActions from '../tagActions';

interface ICreateTagPopupProps {}

export const CreateTagDialog: FunctionComponent<ICreateTagPopupProps> = (props) => {

    const dispatch = useDispatch();

    const { isCreatePopupOpen, isCreating, createTagWithName, createTagAndAddToContentNamed } = useSelector(
        (state: RootState) => state.tagsUi.create
    );

    const onCloseCreateTagPopup = () => {
        dispatch(tagActions.closeCreateTagPopup());
    }

    const onSubmitCreateTag = (content: ICreateTagRequest) => {
        dispatch(tagActions.createTagRequest(content));
    }
    
    const { register, handleSubmit, errors } = useForm<ICreateTagRequest>();
    let title = 'Create new tag';
    if(createTagAndAddToContentNamed) {
        title += ` and add to ${createTagAndAddToContentNamed}`;
    }



    return (
        <Dialog 
            open={isCreatePopupOpen}
            onClose={onCloseCreateTagPopup}
            fullWidth={true}
            maxWidth={'sm'}
            aria-labelledby='create-tag-dialog-title'>
                <DialogTitle id='create-tag-dialog-title'>{title}</DialogTitle>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmitCreateTag)}>
                    <DialogContent>
                        <Box my={2}>
                            <TextField 
                                inputRef={register({ required: true })}
                                error={!!errors.name}
                                id="name" 
                                name="name" 
                                label="Name" 
                                fullWidth={true} 
                                defaultValue={createTagWithName}
                                variant='outlined'
                                helperText={!!errors.name ? "Name is required" : ''}>
                            </TextField>
                        </Box>
                        <Box my={2}>
                            <TextField 
                                inputRef={register()}
                                id="description" 
                                name="description" 
                                label="Description (optional)" 
                                fullWidth={true} 
                                defaultValue=''
                                variant='outlined'>
                            </TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onCloseCreateTagPopup}
                            color='secondary'
                            variant='contained'>
                                Cancel
                        </Button>
                        <Button 
                            type='submit'
                            variant='contained' 
                            color='primary' 
                            startIcon={isCreating ? <CircularProgress size={20} /> : <SaveIcon />} 
                            disabled={isCreating}>
                                    Create
                        </Button>
                    </DialogActions>
                </form>
        </Dialog>
    )
}