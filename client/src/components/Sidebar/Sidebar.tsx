import { SidebarContainer } from './Sidebar.styled';
import Groups from '@mui/icons-material/Groups';
import IconButton from '@mui/material/IconButton';
import React from 'react';

type Props = {}

const Sidebar:React.FC<Props> = () => {
  return (
    <SidebarContainer>
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        <Groups fontSize='large' />
      </IconButton>
    </SidebarContainer>
  );
};

export default Sidebar;
