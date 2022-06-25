import { FriendsListContainer } from './FriendsList.styled';
import FriendListItem from '@components/FriendListItem/FriendListItem';
import React from 'react';

type Props = {}

const DUMMY_FRIENDS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@gmail.com',
    isOnline: true,
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    isOnline: false,
  },
  {
    id: 3,
    name: 'Maria Schwarz',
    email: 'maria@email.com',
    isOnline: true,
  },
];

const sortedFriends = DUMMY_FRIENDS.sort((a, b) => {
  if (a.isOnline && !b.isOnline) {
    return -1;
  } else if (!a.isOnline && b.isOnline) {
    return 1;
  } else {
    return 0;
  }
});

const FriendsList:React.FC<Props> = () => {
  return (
    <FriendsListContainer>{
      sortedFriends.map(friend => (
        <FriendListItem
          key={friend.id}
          friend={friend}
        />
      ))
    }</FriendsListContainer>
  );
};

export default FriendsList;
