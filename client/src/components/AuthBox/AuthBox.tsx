import { StyledBox } from './AuthBox.styled';
import React from 'react';

type Props = {
  children: React.ReactNode;
}

const AuthBox:React.FC<Props> = ({ children }) => {
  return (
    <StyledBox>
      {children}
    </StyledBox>
  );
};

export default AuthBox;
