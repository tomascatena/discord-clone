import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Severity = 'success' | 'info' | 'warning' | 'error';
type Variant = 'filled' | 'outlined' | 'text';
type AnchorOrigin = {
  vertical: 'top' | 'center' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export interface AlertState {
  severity: Severity;
  isOpen: boolean;
  message: string;
  autoHideDuration?: number;
  variant?: Variant;
  anchorOrigin?: AnchorOrigin
}

export const initialState: AlertState = {
  isOpen: false,
  message: 'Something went wrong',
  variant: 'filled',
  severity: 'success',
  autoHideDuration: 5000
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(
      state,
      action: PayloadAction<AlertState>
    ) {
      const { isOpen, message, variant, severity, autoHideDuration, anchorOrigin } = action.payload;

      state.isOpen = isOpen;
      state.message = message;

      if (variant) {
        state.variant = variant;
      }

      if (severity) {
        state.severity = severity;
      }

      if (autoHideDuration) {
        state.autoHideDuration = autoHideDuration;
      }

      if (anchorOrigin) {
        state.anchorOrigin = anchorOrigin;
      }
    },
    resetAlert(state) {
      state.isOpen = false;
    }
  },
  extraReducers: {},
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
