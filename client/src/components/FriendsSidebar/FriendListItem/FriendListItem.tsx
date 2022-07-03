
import { CHAT_TYPES } from '@/constants/constants';
import { IFriend } from '@/typings/typings';
import { StyledButton, StyledSpan } from './FriendListItems.styled';
import { useActions } from '@/hooks/useActions';
import CustomAvatar from '@/components/ui-elements/CustomAvatar/CustomAvatar';
import React from 'react';

type Props = {
  friend: IFriend;
  isOnline: boolean;
}

const FriendListItem:React.FC<Props> = ({ friend, isOnline }) => {
  const actions = useActions();

  const handleChoseActiveConversation = () => {
    actions.setChosenChatDetails({
      friendId: friend._id,
      friendUsername: friend.username,
    });

    actions.setChatType(CHAT_TYPES.DIRECT);
  };

  return (
    <StyledButton
      onClick={handleChoseActiveConversation}
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
