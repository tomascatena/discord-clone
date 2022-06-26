import { PendingInvitationsContainer } from './PendingInvitations.styled';
import PendingInvitationListItem from '@components/PendingInvitationListItem/PendingInvitationListItem';
import React from 'react';

type Props = {}

const DUMMY_INVITATIONS = [
  {
    _id: 1,
    senderId: {
      username: 'john',
      email: 'john@email.com'
    }
  },
  {
    _id: 2,
    senderId: {
      username: 'jane',
      email: 'jane@email.com',
    },
  },
  {
    _id: 3,
    senderId: {
      username: 'maria SchwarzSchwarzSchwarzSchwarzSchwarzSchwarz',
      email: 'maria@email.com',
    }
  },
  {
    _id: 4,
    senderId: {
      username: 'john',
      email: 'john@email.com'
    }
  },
  {
    _id: 5,
    senderId: {
      username: 'jane',
      email: 'jane@email.com',
    },
  },
  {
    _id: 6,
    senderId: {
      username: 'maria SchwarzSchwarzSchwarzSchwarzSchwarzSchwarz',
      email: 'maria@email.com',
    }
  },
];

const PendingInvitations:React.FC<Props> = () => {
  const acceptInvitation = (invitationId: string) => {
    console.log(`Accepting invitation with id ${invitationId}`);
  };

  const rejectInvitation = (invitationId: string) => {
    console.log(`Rejecting invitation with id ${invitationId}`);
  };

  return (
    <PendingInvitationsContainer>
      {DUMMY_INVITATIONS.map(invitation => (
        <PendingInvitationListItem
          key={invitation._id}
          invitation={invitation}
          acceptInvitation={acceptInvitation}
          rejectInvitation={rejectInvitation}
        />
      ))}
    </PendingInvitationsContainer>
  );
};

export default PendingInvitations;
