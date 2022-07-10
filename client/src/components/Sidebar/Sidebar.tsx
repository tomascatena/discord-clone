import { MainButton, SidebarContainer } from './Sidebar.styled';
import Add from '@mui/icons-material/Add';
import Groups from '@mui/icons-material/Groups';
import React from 'react';
import roomHandler from '@/realtimeCommunication/roomHandler';

type Props = {}

const Sidebar:React.FC<Props> = () => {
  const createNewRoomHandler = () => {
    roomHandler.createNewRoom();
  };

  return (
    <SidebarContainer>
      <MainButton>
        <Groups />
      </MainButton>

      <MainButton
        marginTop={3}
        onClick={createNewRoomHandler}
      >
        <Add />
      </MainButton>
    </SidebarContainer>
  );
};

export default Sidebar;
