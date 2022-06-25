import { API_ENDPOINTS } from '@constants/APIEndpoints';
import {
  AuthData,
  IUserLoginForm,
  IUserRegisterForm,
  ValidationError,
} from '../../../typings/typings';
import { RootState } from '@store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

type RejectValue = {
  message?: string;
  errors?: ValidationError[] | null;
  statuScode?: number;
};

export const login = createAsyncThunk<
AuthData,
IUserLoginForm,
{ state: RootState; rejectValue: RejectValue }
>(
  'auth/login',
  async (registerForm, { getState, requestId, rejectWithValue }) => {
    const { loading, currentRequestId } = getState().auth;

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    try {
      const { data } = await axios.post(API_ENDPOINTS.LOGIN, registerForm);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as AxiosError);
      }
    }
  }
);

export const register = createAsyncThunk<
AuthData,
IUserRegisterForm,
{ state: RootState; rejectValue: RejectValue }
>(
  'auth/register',
  async (registerForm, { getState, requestId, rejectWithValue }) => {
    const { loading, currentRequestId } = getState().auth;

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    try {
      const { data } = await axios.post(API_ENDPOINTS.REGISTER, registerForm);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as AxiosError);
      }
    }
  }
);

export const getUser = createAsyncThunk<
AuthData,
void,
{ rejectValue: RejectValue }
>('auth/getUser', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(API_ENDPOINTS.LOGGED_IN_USER);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data as AxiosError);
    }
  }
});
