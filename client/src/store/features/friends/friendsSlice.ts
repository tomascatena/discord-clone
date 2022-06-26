import { IFriend, IUser } from '../../../typings/typings';
import { createSlice } from '@reduxjs/toolkit';

export interface FriendsState {
  friends: IFriend[];
  pendingFriendsInvitations: IFriend[];
  onlineUsers: IUser[];
}

export const initialState: FriendsState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: { },
  extraReducers: () => { },
});

export const friendsActions = friendsSlice.actions;

export default friendsSlice.reducer;
