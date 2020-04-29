import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IApiErrorData } from '../../errors/ApiError';

export interface IErrorState {
    error: IApiErrorData | null;
    isErrorPopupOpen: boolean;
}

const initialState: IErrorState = {
    error: null,
    isErrorPopupOpen: false
};

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<IApiErrorData>) {
            state.error = action.payload;
            state.isErrorPopupOpen = true;
        },
        clearError(state) {
            state.isErrorPopupOpen = false;
            state.error = null;
        }
    }
});

export const {
    setError,
    clearError
} = errorSlice.actions;

export default errorSlice.reducer;

