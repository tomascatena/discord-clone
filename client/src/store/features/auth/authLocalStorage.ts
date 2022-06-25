import { IUser } from '../../../typings/typings';

export const clearAuthenticatedUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('userData');
};

export const persistAuthenticatedUser = (accessToken: string, userData: Partial<IUser>) => {
  localStorage.setItem('accessToken', JSON.stringify(accessToken));
  localStorage.setItem('userData', JSON.stringify(userData));
};
