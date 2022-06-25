import { Button, Typography } from '@mui/material';
import { FriendsSidebarContainer, ListsContainer } from './FriendsSidebar.styled';
import CustomDialog from '@components/CustomDialog/CustomDialog';
import FriendsList from '@components/FriendsList/FriendsList';
import PendingInvitations from '../PendingInvitations/PendingInvitations';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import React from 'react';

type Props = {}

const FriendsSidebar:React.FC<Props> = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const openAddFriendDialog = () => {
    setIsDialogOpen(true);
    console.log('openAddFriendDialog');
  };

  return (
    <FriendsSidebarContainer>
      <Button
        variant='contained'
        startIcon={<PersonAddAltIcon/>}
        onClick={openAddFriendDialog}
      >
        Add Friend
      </Button>

      <ListsContainer>
        <Typography
          variant='body1'
          textTransform='uppercase'
          color='textPrimary'
        >
          Private Messages
        </Typography>

        <FriendsList/>

        <Typography
          variant='body1'
          textTransform='uppercase'
          color='textPrimary'
        >
          Invitations
        </Typography>

        <PendingInvitations/>
      </ListsContainer>

      <CustomDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </FriendsSidebarContainer>
  );
};

export default FriendsSidebar;
