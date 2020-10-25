import { RootState } from '../../app/store';

export const getErrorUiData = () => (state: RootState) => state.errors;