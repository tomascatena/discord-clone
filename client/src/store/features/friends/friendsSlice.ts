import { IFriend, IOnlineUser, IPendingInvitation, ValidationError } from '../../../typings/typings';
import { SerializedError, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { acceptFriendInvitation, rejectFriendInvitation, sendInvitation } from './friends.thunk';

export interface FriendsState {
  friends: IFriend[];
  pendingFriendsInvitations: IPendingInvitation[];
  onlineUsers: IOnlineUser[];
  loading: boolean;
  currentRequestId: string | undefined;
  error: SerializedError | null;
  serverValidationErrors: ValidationError[] | null;
}

export const initialState: FriendsState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
  loading: false,
  currentRequestId: '',
  error: null,
  serverValidationErrors: null,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    setPendingFriendsInvitations: (state, action) => {
      state.pendingFriendsInvitations = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendInvitation.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
          state.serverValidationErrors = null;
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(sendInvitation.fulfilled, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.currentRequestId = undefined;
        }
      })
      .addCase(sendInvitation.rejected, (state, action) => {
        const { requestId } = action.meta;

        if (state.loading && state.currentRequestId === requestId) {
          state.loading = false;
          state.serverValidationErrors = action.payload?.errors ?? null;
          state.error = action.payload ?? null;
          state.currentRequestId = undefined;
        }
      })
      .addMatcher(
        isAnyOf(
          acceptFriendInvitation.pending,
          rejectFriendInvitation.pending
        ), (state, action) => {
          if (!state.loading) {
            state.loading = true;
            state.serverValidationErrors = null;
            state.error = null;
            state.currentRequestId = action.meta.requestId;
          }
        })
      .addMatcher(
        isAnyOf(
          acceptFriendInvitation.fulfilled,
          rejectFriendInvitation.fulfilled
        ), (state, action) => {
          const { requestId } = action.meta;

          if (state.loading && state.currentRequestId === requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        })
      .addMatcher(
        isAnyOf(
          acceptFriendInvitation.rejected,
          rejectFriendInvitation.rejected
        ), (state, action) => {
          const { requestId } = action.meta;

          if (state.loading && state.currentRequestId === requestId) {
            state.loading = false;
            state.serverValidationErrors = action.payload?.errors ?? null;
            state.error = action.payload ?? null;
            state.currentRequestId = undefined;
          }
        });
  },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice.reducer;
