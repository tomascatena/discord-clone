import { Box } from '@mui/system';
import { HtmlTooltip } from '@components/HtmlTooltip/HtmlTooltip';
import { IconButton, Typography } from '@mui/material';
import { StyledBox } from './PendingInvitationListItem.styled';
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
  acceptInvitation: () => void;
  rejectInvitation: () => void;
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

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <IconButton
            onClick={acceptInvitation}
            sx={{
              height: '2rem',
              width: '2rem',
              color: 'green',
              backgroundColor: '#ddd',
              ':hover': {
                backgroundColor: '#fff',
              },
            }}
          >
            <Check/>
          </IconButton>

          <IconButton
            onClick={rejectInvitation}
            sx={{
              height: '2rem',
              width: '2rem',
              color: 'red',
              backgroundColor: '#ddd',
              ':hover': {
                backgroundColor: '#fff',
              },
            }}
          >
            <Clear />
          </IconButton>
        </Box>
      </StyledBox>
    </HtmlTooltip>
  );
};

export default PendingInvitationListItem;
