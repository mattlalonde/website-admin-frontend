import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorDialog } from './ErrorDialog';
import { getErrorUiData } from '../errorSelectors';
import { clearError } from '../errorsSlice';

interface IGlobalErrorProps {}

export const GlobalError: FunctionComponent<IGlobalErrorProps> = (props) => {

    const dispatch = useDispatch();
    const { error, isErrorPopupOpen } = useSelector(getErrorUiData());

    const onCloseErrorDialog = () => {
        dispatch(clearError());
    }

    return error && <ErrorDialog open={isErrorPopupOpen} error={error} handleClose={onCloseErrorDialog} />
}