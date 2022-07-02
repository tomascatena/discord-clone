
import { IFriend } from '../../typings/typings';
import { StyledButton, StyledSpan } from './FriendListItems.styled';
import CustomAvatar from '@components/CustomAvatar/CustomAvatar';
import React from 'react';

type Props = {
  friend: IFriend;
  isOnline: boolean;
}

const FriendListItem:React.FC<Props> = ({ friend, isOnline }) => {
  return (
    <StyledButton
      isActive={isOnline}
      disabled={!isOnline}
    >
      <CustomAvatar
        isOnline={isOnline}
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
