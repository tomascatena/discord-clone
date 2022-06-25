import { Alert, Snackbar, } from '@mui/material';
import React from 'react';

type Props = {
  severity: 'success' | 'error' | 'warning' | 'info';
  isOpen: boolean;
  message: string;
  autoHideDuration?: number;
  variant?: 'filled' | 'outlined' | 'standard';
  anchorOrigin?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
}

const CustomSnackbar:React.FC<Props> = ({
  severity,
  isOpen,
  message,
  autoHideDuration = 5000,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => {
  const [open, setOpen] = React.useState(isOpen);

  React.useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={() => setOpen(false)}
    >
      <Alert
        variant='filled'
        onClose={() => setOpen(false)}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>);
};

export default CustomSnackbar;
