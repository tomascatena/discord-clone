import { PendingInvitationsContainer } from './PendingInvitations.styled';
import { useTypedSelector } from '@hooks/useTypedSelector';
import PendingInvitationListItem from '@components/PendingInvitationListItem/PendingInvitationListItem';
import React from 'react';

type Props = {}

const PendingInvitations:React.FC<Props> = () => {
  const { pendingFriendsInvitations } = useTypedSelector((state) => state.friends);

  const acceptInvitation = (invitationId: string) => {
    console.log(`Accepting invitation with id ${invitationId}`);
  };

  const rejectInvitation = (invitationId: string) => {
    console.log(`Rejecting invitation with id ${invitationId}`);
  };

  return (
    <PendingInvitationsContainer>
      {pendingFriendsInvitations.map(invitation => (
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
