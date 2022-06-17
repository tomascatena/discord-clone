import { BoxWrapper, StyledBox } from './AuthBox.styled';
import React from 'react';

type Props = {
  children: React.ReactNode;
}

const AuthBox:React.FC<Props> = ({ children }) => {
  return (
    <BoxWrapper>
      <StyledBox>
        {children}
      </StyledBox>
    </BoxWrapper>
  );
};

export default AuthBox;
