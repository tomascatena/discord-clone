import { Button } from '@mui/material';
import { SxProps } from '@mui/system';
import React from 'react';

type Props = {
  children: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  isDisabled?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
  sx?: SxProps;
}

const CustomButton:React.FC<Props> = ({
  sx = {},
  children,
  onClick,
  isDisabled = false,
  variant = 'contained',
  type = 'button'
}) => {
  return (
    <Button
      sx={sx}
      onClick={onClick}
      disabled={isDisabled}
      variant={variant}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
