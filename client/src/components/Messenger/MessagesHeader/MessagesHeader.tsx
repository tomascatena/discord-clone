import { FriendDetails, MessagesHeaderContainer } from './MessagesHeader.styled';
import { IChatDetails } from '@/typings/typings';
import { Typography } from '@mui/material';
import CustomAvatar from '@/components/ui-elements/CustomAvatar/CustomAvatar';
import React from 'react';

type Props = {
  chosenChatDetails: IChatDetails;
}

const MessagesHeader:React.FC<Props> = ({ chosenChatDetails }) => {
  return (
    <MessagesHeaderContainer>
      <FriendDetails>
        <CustomAvatar
          imgAltText={chosenChatDetails?.friendUsername}
          hasOnlineIndicator={false}
          isOnline={false}
          size={50}
        />

        <Typography
          variant="h4"
          color="textPrimary"
        >
          {chosenChatDetails?.friendUsername}
        </Typography>
      </FriendDetails>

      <Typography color="textSecondary" >
        This is the beginning of your conversation with {chosenChatDetails?.friendUsername}
      </Typography>
    </MessagesHeaderContainer>
  );
};

export default MessagesHeader;
