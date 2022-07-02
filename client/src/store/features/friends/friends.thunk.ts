import { API_ENDPOINTS } from '@constants/APIEndpoints';
import {
  AuthData,
  IInvitationData,
  InvitationResponseData,
  ValidationError
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

export const acceptFriendInvitation = createAsyncThunk<
void,
InvitationResponseData,
{ state: RootState; rejectValue: RejectValue }
>(
  'friends/acceptFriendInvitation',
  async (invitationResponseData, { getState, requestId, rejectWithValue }) => {
    const { loading, currentRequestId } = getState().friends;

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.ACCEPT_FRIEND_INVITATION, invitationResponseData);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as AxiosError);
      }
    }
  }
);

export const rejectFriendInvitation = createAsyncThunk<
void,
InvitationResponseData,
{ state: RootState; rejectValue: RejectValue }
>(
  'friends/rejectFriendInvitation',
  async (invitationResponseData, { getState, requestId, rejectWithValue }) => {
    const { loading, currentRequestId } = getState().friends;

    if (!loading || requestId !== currentRequestId) {
      return;
    }

    try {
      const { data } = await axiosInstance.post(API_ENDPOINTS.REJECT_FRIEND_INVITATION, invitationResponseData);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data as AxiosError);
      }
    }
  }
);
