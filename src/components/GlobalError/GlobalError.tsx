import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ErrorDialog } from './ErrorDialog';
import { clearError } from '../../features/errors/errorsSlice';

interface IGlobalErrorProps {}

export const GlobalError: FunctionComponent<IGlobalErrorProps> = (props) => {

    const dispatch = useDispatch();
    const { error, isErrorPopupOpen } = useSelector(
        (state: RootState) => state.errors
    );

    const onCloseErrorDialog = () => {
        dispatch(clearError());
    }

    return error && <ErrorDialog open={isErrorPopupOpen} error={error} handleClose={onCloseErrorDialog} />
}