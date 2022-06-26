import { DashboardPageContainer } from './DashboardPage.styled';
import { connectWithSocketServer } from 'realtimeCommunication/socketConnection';
import { useActions } from '../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import AppBar from '@components/AppBar/AppBar';
import FriendsSidebar from '@components/FriendsSidebar/FriendsSidebar';
import Messenger from '@components/Messenger/Messenger';
import React from 'react';
import Sidebar from '@components/Sidebar/Sidebar';

const DashboardPage:React.FC = () => {
  const navigate = useNavigate();
  const actions = useActions();

  React.useEffect(() => {
    const userData = localStorage.getItem('userData');
    const accessToken = localStorage.getItem('accessToken');

    if (!userData || !accessToken) {
      actions.logout();
      navigate('/login');
    } else {
      connectWithSocketServer({
        userData: JSON.parse(userData),
        accessToken: JSON.parse(accessToken)
      });
    }
  }, []);

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
