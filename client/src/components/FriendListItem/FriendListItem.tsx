
import { StyledButton, StyledSpan } from './FriendListItems.styled';

import CustomAvatar from '@components/CustomAvatar/CustomAvatar';
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
  return (
    <StyledButton
      isActive={friend.isOnline}
      disabled={!friend.isOnline}
    >
      <CustomAvatar
        isOnline={friend.isOnline}
        imgAltText={friend.name}
        hasOnlineIndicator
      />

      <StyledSpan>
        {friend.name}
      </StyledSpan>
    </StyledButton>
  );
};

export default FriendListItem;
