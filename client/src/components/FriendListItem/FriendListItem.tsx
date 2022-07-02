
import { IFriend } from '../../typings/typings';
import { StyledButton, StyledSpan } from './FriendListItems.styled';
import CustomAvatar from '@components/CustomAvatar/CustomAvatar';
import React from 'react';

type Props = {
  friend: IFriend;
}

const FriendListItem:React.FC<Props> = ({ friend }) => {
  return (
    <StyledButton
      isActive={friend.isOnline}
      disabled={!friend.isOnline}
    >
      <CustomAvatar
        isOnline={friend.isOnline}
        imgAltText={friend.username}
        hasOnlineIndicator
      />

      <StyledSpan>
        {friend.username}
      </StyledSpan>
    </StyledButton>
  );
};

export default FriendListItem;
