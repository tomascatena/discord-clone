import { Button } from '@mui/material';
import { FriendsSidebarContainer } from './FriendsSidebar.styled';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import React from 'react';

type Props = {}

const FriendsSidebar:React.FC<Props> = () => {
  const openAddFriendDialog = () => {
    console.log('openAddFriendDialog');
  };

  return (
    <FriendsSidebarContainer>
      <Button
        variant='outlined'
        startIcon={<PersonAddAltIcon/>}
        onClick={openAddFriendDialog}
      >
        Add Friend
      </Button>
    </FriendsSidebarContainer>
  );
};

export default FriendsSidebar;
