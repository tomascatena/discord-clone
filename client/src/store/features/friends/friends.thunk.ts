import { API_ENDPOINTS } from '@constants/APIEndpoints';
import {
  AuthData,
  IInvitationData,
  ValidationError,
} from '../../../typings/typings';
import { RootState } from '@store/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import axiosInstance from '../../../axiosConfig';

type RejectValue = {
  message?: string;
  errors?: ValidationError[] | null;
  statuScode?: number;
};

export const sendInvitation = createAsyncThunk<
AuthData,
IInvitationData,
{ state: RootState; rejectValue: RejectValue }
>(
  'friends/sendInvitation',
  async (invitationData, { getState, requestId, rejectWithValue }) => {
    const { loading, currentRequestId } = getState().friends;

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    console.log('thunk', invitationData);

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.SEND_INVITATION, invitationData);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as AxiosError);
      }
    }
  }
);
