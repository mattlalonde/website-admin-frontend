import React, { FunctionComponent } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import userActions from '../userActions';
import { ILoginRequest } from '../apiRequests';
import { Box, TextField, Button, CircularProgress } from '@material-ui/core';
import { LoggedInState } from './LoggedInState';
import LockIcon from '@material-ui/icons/Lock';

interface ILoginFormProps {
    processingState: LoggedInState;
}

export const LoginForm: FunctionComponent<ILoginFormProps> = ({processingState}) => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<ILoginRequest>();

    const onLogin = handleSubmit(data => {
        dispatch(userActions.loginRequest(data));
    });

    return (
        <form noValidate autoComplete="off" onSubmit={onLogin}>
            <Box my={2}>
                <TextField 
                    inputRef={register({ required: true })}
                    error={!!errors.email}
                    id="email" 
                    name="email" 
                    label="Email" 
                    fullWidth={true} 
                    variant='outlined'
                    helperText={!!errors.email ? "Email is required" : ''}>
                </TextField>
            </Box>
            <Box my={2}>
                <TextField 
                    inputRef={register({ required: true })}
                    error={!!errors.password}
                    id="password" 
                    name="password" 
                    label="Password" 
                    fullWidth={true} 
                    variant='outlined'
                    type='password'
                    helperText={!!errors.password ? "Password is required" : ''}>
                </TextField>
            </Box>
            <Box my={2}>
                <Button
                    type='submit'
                    variant='contained' 
                    color='primary' 
                    startIcon={processingState === LoggedInState.LoggingIn ? <CircularProgress size={20} /> : <LockIcon />} 
                    disabled={processingState === LoggedInState.LoggingIn}>
                        Log in
                </Button>
            </Box>
        </form>
    )
}