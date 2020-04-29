import React, { FunctionComponent } from 'react';
import { DialogContent, Dialog, DialogTitle, Button, DialogActions, Box, withStyles } from '@material-ui/core';
import { IApiErrorData } from '../../errors/ApiError';

import ErrorIcon from '@material-ui/icons/ErrorOutline';
import { SubErrorList } from './SubErrorList';


interface IErrorDialogPopupProps {
    handleClose: () => void;
    error: IApiErrorData;
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
                        <strong>Timestamp:</strong> {error.apierror.timestamp}
                    </Box>
                    <Box my={2}>
                        <strong>Status:</strong> {error.apierror.status}
                    </Box>
                    <Box my={2}>
                        {error.apierror.message}
                    </Box>
                    {error.apierror.debugMessage && (
                        <Box my={2}>
                            {error.apierror.debugMessage}
                        </Box>
                    )}
                    {error.apierror.subErrors && error.apierror.subErrors.length > 0 && (
                        <Box my={2}>
                            <SubErrorList subErrors={error.apierror.subErrors} />
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