import { StyledLink } from './CustomLink.styled';
import { Typography } from '@mui/material';
import React from 'react';

type Props = {
  text: string;
  redirectText: string;
  to: string;
}

const CustomLink:React.FC<Props> = ({
  text,
  redirectText,
  to,
}) => {
  return (
    <Typography
      variant='body1'
      color='text.secondary'
    >
      {text && `${text} ` }

      <StyledLink to={to}>
        {redirectText}
      </StyledLink>
    </Typography>
  );
};

export default CustomLink;
