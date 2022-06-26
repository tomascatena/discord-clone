import { Button } from '@mui/material';
import { SxProps } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

type Props = {
  text: string;
  type: 'submit' | 'reset' | 'button';
  isDisabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  sx?: SxProps;
  isLoading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const CustomButton:React.FC<Props> = ({
  text,
  loadingText,
  sx = {},
  isDisabled = false,
  variant = 'contained',
  type = 'button',
  isLoading = false,
  onSubmit,
  onClick,
}) => {
  const loadingState = (
    <>
      <CircularProgress
        size={20}
        sx={{ marginRight: 1 }}
      />{' '}
      {loadingText || text}
    </>
  );

  return (
    <Button
      sx={sx}
      onClick={onClick}
      disabled={isDisabled || isLoading}
      variant={variant}
      type={type}
      {...(type === 'submit' ? onSubmit : undefined)}
    >
      {isLoading ? loadingState : <>{text}</>}
    </Button>
  );
};

export default CustomButton;
