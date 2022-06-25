import { IUser, ValidationError } from '../../../typings/typings';
import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { clearAuthenticatedUser, persistAuthenticatedUser } from './authLocalStorage';
import { getUser, login, register } from './auth.thunk';

export interface AuthState {
  user: Partial<IUser> | null;
  loading: boolean;
  currentRequestId: string | undefined;
  serverValidationErrors: ValidationError[] | null;
  error: SerializedError | null;
  isAuthenticated: boolean;
  accessToken: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  currentRequestId: undefined,
  serverValidationErrors: null,
  error: null,
  isAuthenticated: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hydrateAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;

      clearAuthenticatedUser();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        if (!state.loading) {
          state.user = null;
          state.loading = true;
          state.serverValidationErrors = null;
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.user = action.payload.user;
          state.loading = false;
          state.currentRequestId = undefined;
          state.isAuthenticated = true;
          state.accessToken = action.payload.tokens?.access.token ?? null;

          persistAuthenticatedUser(state.accessToken!, state.user);
        }
      })
      .addCase(login.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.user = null;
          state.loading = false;
          state.serverValidationErrors = action.payload?.errors ?? null;
          state.error = action.payload ?? null;
          state.currentRequestId = undefined;
          state.isAuthenticated = false;
          state.accessToken = null;

          clearAuthenticatedUser();
        }
      })
      .addCase(register.pending, (state, action) => {
        if (!state.loading) {
          state.user = null;
          state.loading = true;
          state.serverValidationErrors = null;
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(register.fulfilled, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.user = action.payload.user;
          state.loading = false;
          state.currentRequestId = undefined;
          state.isAuthenticated = true;
          state.accessToken = action.payload.tokens?.access.token ?? null;

          persistAuthenticatedUser(state.accessToken!, state.user);
        }
      })
      .addCase(register.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.user = null;
          state.loading = false;
          state.serverValidationErrors = action.payload?.errors ?? null;
          state.error = action.payload ?? null;
          state.currentRequestId = undefined;
          state.isAuthenticated = false;
          state.accessToken = null;

          clearAuthenticatedUser();
        }
      })
      .addCase(getUser.pending, (state, action) => {
        if (!state.loading) {
          state.user = null;
          state.loading = true;
          state.serverValidationErrors = null;
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.user = action.payload.user;
          state.loading = false;
          state.currentRequestId = undefined;
          state.isAuthenticated = true;
          state.accessToken = action.payload.tokens?.access.token ?? null;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.user = null;
          state.loading = false;
          state.serverValidationErrors = action.payload?.errors ?? null;
          state.error = action.payload ?? null;
          state.currentRequestId = undefined;
          state.isAuthenticated = false;
          state.accessToken = null;
        }
      });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
