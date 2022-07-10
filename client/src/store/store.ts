import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { getInitialState } from './getInitialState';
import alertReducer from './features/alert/alertSlice';
import authReducer from './features/auth/authSlice';
import chatReducer from './features/chat/chatSlice';
import friendsReducer from './features/friends/friendsSlice';
import roomReducer from './features/room/roomSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    friends: friendsReducer,
    chat: chatReducer,
    room: roomReducer
  },
});

getInitialState();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
