import * as style from '@dicebear/pixel-art';
import { StyledBadge } from './Customavatar.styled';
import { createAvatar } from '@dicebear/avatars';
import React from 'react';

type Props = {
  imgAltText: string;
  hasOnlineIndicator: boolean;
  isOnline: boolean;
  size?: number;
}

const CustomAvatar:React.FC<Props> = ({ imgAltText, hasOnlineIndicator, isOnline, size = 32 }) => {
  const avatar = createAvatar(style, {
    seed: imgAltText,
    dataUri: true,
    size,
    backgroundColor: '#fff',
    radius: 30,
  });

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
      isOnline={isOnline}
      hasOnlineIndicator={hasOnlineIndicator}
    >
      <img
        src={avatar}
        alt={imgAltText}
      />
    </StyledBadge>

  );
};

export default CustomAvatar;
