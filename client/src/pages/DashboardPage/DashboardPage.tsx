import { DashboardPageContainer } from './DashboardPage.styled';
import AppBar from '@components/AppBar/AppBar';
import FriendsSidebar from '@components/FriendsSidebar/FriendsSidebar';
import Messenger from '@components/Messenger/Messenger';
import React from 'react';
import Sidebar from '@components/Sidebar/Sidebar';

const DashboardPage:React.FC = () => {
  return (
    <DashboardPageContainer>
      <Sidebar/>

      <FriendsSidebar/>

      <Messenger/>

      <AppBar/>
    </DashboardPageContainer>
  );
};

export default DashboardPage;
