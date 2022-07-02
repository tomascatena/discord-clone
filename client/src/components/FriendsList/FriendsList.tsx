import { FriendsListContainer } from './FriendsList.styled';
import { IFriend } from '../../typings/typings';
import { useTypedSelector } from '@hooks/useTypedSelector';
import FriendListItem from '@components/FriendListItem/FriendListItem';
import React from 'react';

type Props = {}

const sortedFriends = (friends: IFriend[]) => {
  return [...friends].sort((a, b) => {
    if (a.isOnline && !b.isOnline) {
      return -1;
    } else if (!a.isOnline && b.isOnline) {
      return 1;
    } else {
      return 0;
    }
  });
};

const FriendsList:React.FC<Props> = () => {
  const { friends } = useTypedSelector((state) => state.friends);

  return (
    <FriendsListContainer>{
      sortedFriends(friends).map(friend => (
        <FriendListItem
          key={friend._id}
          friend={friend}
        />
      ))
    }</FriendsListContainer>
  );
};

export default FriendsList;
