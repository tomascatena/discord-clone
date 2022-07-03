import { Alert, Snackbar, } from '@mui/material';
import { useActions } from '@/hooks/useActions';
import Fade from '@mui/material/Fade';
import React from 'react';

type Props = {
  severity: 'success' | 'error' | 'warning' | 'info';
  isOpen: boolean;
  message: string;
  autoHideDuration?: number;
  fadeTimeout?: number;
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
  fadeTimeout = 1000,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
}) => {
  const { resetAlert } = useActions();

  const [showAlert, setShowAlert] = React.useState(false);

  const handleClose = () => {
    setShowAlert(false);

    setTimeout(() => resetAlert(), fadeTimeout); // wait for fadeout to finish
  };

  React.useEffect(() => {
    if (isOpen) {
      setShowAlert(true);

      const timerId = setTimeout(() => {
        handleClose();
      }, autoHideDuration);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isOpen]);

  return (
    <Fade
      appear={showAlert}
      in={showAlert}
      timeout={fadeTimeout}
      unmountOnExit={true}
    >
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={showAlert}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert
          variant='filled'
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Fade>
  );
};

export default CustomSnackbar;
