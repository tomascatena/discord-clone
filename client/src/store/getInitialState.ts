import { authActions } from './features/auth/authSlice';
import { getUser } from './features/auth/auth.thunk';
import { setAuthToken } from '@utils/setAuthToken';
import { store } from './store';
import validator from 'validator';

export const getInitialState = () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && validator.isJWT(JSON.parse(accessToken))) {
      const parsedToken = JSON.parse(accessToken);

      setAuthToken(parsedToken);
      store.dispatch(authActions.hydrateAccessToken(parsedToken));
      store.dispatch(getUser());
    } else {
      setAuthToken(null);
      store.dispatch(authActions.logout());
    }
  } catch (error) {
    store.dispatch(authActions.logout());

    console.error(error);
  }
};
