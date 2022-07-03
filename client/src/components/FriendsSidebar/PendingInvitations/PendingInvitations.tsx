import { PendingInvitationsContainer } from './PendingInvitations.styled';
import { acceptFriendInvitation, rejectFriendInvitation } from '@/store/features/friends/friends.thunk';
import { useActions } from '@/hooks/useActions';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import CustomSnackbar from '@/components/ui-elements/CustomSnackbar/CustomSnackbar';
import PendingInvitationListItem from '@/components/FriendsSidebar/PendingInvitationListItem/PendingInvitationListItem';
import React from 'react';

type Props = {}

const PendingInvitations:React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { setAlert } = useActions();

  const { pendingFriendsInvitations } = useTypedSelector((state) => state.friends);
  const { isOpen, message, severity } = useTypedSelector((state) => state.alert);

  const acceptInvitation = (invitationId: string) => {
    dispatch(acceptFriendInvitation({
      invitationId,
    })).then((data) => {
      if (data.type.includes('rejected')) {
        setAlert({
          isOpen: true,
          message: data.payload?.message!,
          severity: 'error'
        });
      } else {
        setAlert({
          isOpen: true,
          message: data.payload?.message!,
          severity: 'success'
        });
      }
    });
  };

  const rejectInvitation = (invitationId: string) => {
    dispatch(rejectFriendInvitation({
      invitationId,
    })).then((data) => {
      if (data.type.includes('rejected')) {
        setAlert({
          isOpen: true,
          message: data.payload?.message!,
          severity: 'error'
        });
      } else {
        setAlert({
          isOpen: true,
          message: data.payload?.message!,
          severity: 'success'
        });
      }
    });
  };

  return (
    <>
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

      <CustomSnackbar
        severity={severity}
        isOpen={isOpen}
        message={message!}
      />
    </>
  );
};

export default PendingInvitations;
