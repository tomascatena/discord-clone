
import * as style from '@dicebear/pixel-art';
import { StyledBadge, StyledButton, StyledSpan } from './FriendListItems.styled';
import { createAvatar } from '@dicebear/avatars';
import React from 'react';

type Friend = {
  id: number;
  name: string;
  email: string;
  isOnline: boolean;
}

type Props = {
  friend: Friend;
}

const FriendListItem:React.FC<Props> = ({ friend }) => {
  const avatar = React.useMemo(() => {
    return createAvatar(style, {
      seed: friend.name,
      dataUri: true,
      size: 32,
      backgroundColor: '#fff',
      radius: 50,
    });
  }, []);

  return (
    <StyledButton
      isOnline={friend.isOnline}
      disabled={!friend.isOnline}
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        isOnline={friend.isOnline}
      >
        <img
          src={avatar}
          alt={friend.name}
        />
      </StyledBadge>

      <StyledSpan>
        {friend.name}
      </StyledSpan>
    </StyledButton>
  );
};

export default FriendListItem;
