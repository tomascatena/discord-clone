import { HtmlTooltip } from '@components/HtmlTooltip/HtmlTooltip';
import { IconsContainer, StyledBox, StyledIconButton } from './PendingInvitationListItem.styled';
import { Typography } from '@mui/material';
import Check from '@mui/icons-material/Check';
import Clear from '@mui/icons-material/Clear';
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
  acceptInvitation: (id: string) => void;
  rejectInvitation: (id: string) => void;
}

const PendingInvitationListItem:React.FC<Props> = ({ invitation, acceptInvitation, rejectInvitation }) => {
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
      <StyledBox isActive>
        <CustomAvatar
          isOnline={false}
          imgAltText={invitation.senderId.username}
          hasOnlineIndicator={false}
        />

        <IconsContainer>
          <StyledIconButton
            onClick={() => acceptInvitation(invitation.senderId.username)}
            iconColor='green'
          >
            <Check/>
          </StyledIconButton>

          <StyledIconButton
            onClick={() => rejectInvitation(invitation.senderId.username)}
            iconColor='red'
          >
            <Clear/>
          </StyledIconButton>
        </IconsContainer>
      </StyledBox>
    </HtmlTooltip>
  );
};

export default PendingInvitationListItem;
