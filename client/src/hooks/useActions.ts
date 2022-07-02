import { alertActions } from '@store/features/alert/alertSlice';
import { authActions } from '@store/features/auth/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { chatActions } from '@store/features/chat/chatSlice';
import { friendsActions } from '@store/features/friends/friendsSlice';
import { useDispatch } from 'react-redux';

const actions = {
  ...alertActions,
  ...authActions,
  ...friendsActions,
  ...chatActions
};

export const useActions = (): typeof actions => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
