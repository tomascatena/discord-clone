import { alertActions } from '@store/features/alert/alertSlice';
import { authActions } from '@store/features/auth/authSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const actions = {
  ...alertActions,
  ...authActions,
};

export const useActions = (): typeof actions => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
