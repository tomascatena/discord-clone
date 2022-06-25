import { MainButton, SidebarContainer } from './Sidebar.styled';
import Groups from '@mui/icons-material/Groups';
import React from 'react';

type Props = {}

const Sidebar:React.FC<Props> = () => {
  return (
    <SidebarContainer>
      <MainButton >
        <Groups />
      </MainButton>
    </SidebarContainer>
  );
};

export default Sidebar;
