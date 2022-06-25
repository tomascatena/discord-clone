import { HtmlTooltip } from '@components/HtmlTooltip/HtmlTooltip';
import { StyledButton, StyledSpan } from './PendingInvitationListItem.styled';
import { Typography } from '@mui/material';
import CustomAvatar from '@components/CustomAvatar/CustomAvatar';
import React from 'react';

type Invitation = {
  _id: number;
  senderId: {
    username: string;
    email: string;
  };
}

type Props = {
  invitation: Invitation;
  acceptInvitation: () => void;
  rejectInvitation: () => void;
}

const PendingInvitationListItem:React.FC<Props> = ({ invitation }) => {
  return (
    <HtmlTooltip
      placement="right"
      title={
        <React.Fragment>
          <Typography color="inherit">{invitation.senderId.email}</Typography>
          <b>{invitation.senderId.username}</b> would like to connect with you.
        </React.Fragment>
      }
    >
      <StyledButton isActive>
        <CustomAvatar
          isOnline={false}
          imgAltText={invitation.senderId.username}
          hasOnlineIndicator={false}
        />

        <StyledSpan>
          {invitation.senderId.username}
        </StyledSpan>
      </StyledButton>
    </HtmlTooltip>
  );
};

export default PendingInvitationListItem;
