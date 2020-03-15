import React, { FunctionComponent } from 'react';
import { DialogContent, Dialog, DialogTitle, TextField, Button, CircularProgress, DialogActions, Box } from '@material-ui/core';

import { ICreateArticleRequest } from '../models';
import { useForm } from 'react-hook-form';
import SaveIcon from '@material-ui/icons/Save';
import { Alert } from '@material-ui/lab';

interface ICreateArticlePopupProps {
    handleClose: () => void;
    onSubmit: (content: ICreateArticleRequest) => void;
    isPopupOpen: boolean;
    isCreating: boolean;
    createArticleServerError: string | Error | null;
}

export const CreateArticleDialog: FunctionComponent<ICreateArticlePopupProps> = ({handleClose, onSubmit, isPopupOpen, isCreating, createArticleServerError}) => {

    const { register, handleSubmit, errors } = useForm<ICreateArticleRequest>();

    return (
        <Dialog 
            open={isPopupOpen}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'sm'}
            aria-labelledby='create-article-dialog-title'>
                <DialogTitle id='create-article-dialog-title'>Create new article</DialogTitle>
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent>
                        <TextField 
                            inputRef={register({ required: true })}
                            error={!!errors.title}
                            id="title" 
                            name="title" 
                            label="Title" 
                            fullWidth={true} 
                            defaultValue=''
                            variant='outlined'
                            helperText={!!errors.title ? "Title is required" : ''}>
                        </TextField>

                        {createArticleServerError ?
                        <Box my={2}>
                            <Alert severity='error'>
                                { typeof createArticleServerError === 'string'
                                    ? createArticleServerError
                                    : createArticleServerError.message}
                            </Alert>
                        </Box>
                        : null}
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