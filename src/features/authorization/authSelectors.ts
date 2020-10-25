import { RootState } from '../../app/store';

export const getLoggedInState = () => (state: RootState) => state.authorization.login.loggedInState;
export const getTokenExpiresAt = () => (state: RootState) => state.authorization.login.tokenExpiresAt;
