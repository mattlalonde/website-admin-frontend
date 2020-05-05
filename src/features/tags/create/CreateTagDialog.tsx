import React, { FunctionComponent } from 'react';
import { DialogContent, Dialog, DialogTitle, TextField, Button, CircularProgress, DialogActions, Box } from '@material-ui/core';

import { useForm } from 'react-hook-form';
import SaveIcon from '@material-ui/icons/Save';
import { ICreateTagRequest } from '../apiRequests';

interface ICreateTagPopupProps {
    handleClose: () => void;
    onSubmit: (content: ICreateTagRequest) => void;
    isPopupOpen: boolean;
    isCreating: boolean;
}

export const CreateTagDialog: FunctionComponent<ICreateTagPopupProps> = ({handleClose, onSubmit, isPopupOpen, isCreating}) => {
    
    const { register, handleSubmit, errors } = useForm<ICreateTagRequest>();

    return (
        <Dialog 
            open={isPopupOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'sm'}
            aria-labelledby='create-tag-dialog-title'>
                <DialogTitle id='create-tag-dialog-title'>Create new tag</DialogTitle>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <Box my={2}>
                            <TextField 
                                inputRef={register({ required: true })}
                                error={!!errors.name}
                                id="name" 
                                name="name" 
                                label="Name" 
                                fullWidth={true} 
                                defaultValue=''
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
                            onClick={handleClose}
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