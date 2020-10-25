import React, { FunctionComponent } from 'react';
import { DialogContent, Dialog, DialogTitle, Button, DialogActions, Box, withStyles } from '@material-ui/core';

import ErrorIcon from '@material-ui/icons/ErrorOutline';
import { SubErrorList } from './SubErrorList';
import { IErrorData } from '../models';


interface IErrorDialogPopupProps {
    handleClose: () => void;
    error: IErrorData;
    open: boolean;
}

const ErrorDialogTitle = withStyles({
    root: {
        backgroundColor: '#ea6061',
        color: '#ffffff'
    }
})(DialogTitle);

export const ErrorDialog: FunctionComponent<IErrorDialogPopupProps> = ({handleClose, error, open}) => {

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'sm'}
            aria-labelledby='error-dialog-title'>
                <ErrorDialogTitle id='error-dialog-title'>
                    <ErrorIcon fontSize='default'></ErrorIcon>
                    <span>Error</span>
                </ErrorDialogTitle>
                <DialogContent>
                    <Box my={2}>
                        <strong>{error.type}</strong>
                    </Box>
                    <Box my={2}>
                        {error.message}
                    </Box>
                    {error.subErrors && error.subErrors.length > 0 && (
                        <Box my={2}>
                            <SubErrorList subErrors={error.subErrors} />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color='primary'
                        variant='contained'>
                            Ok
                    </Button>
                </DialogActions>
        </Dialog>
    )
}