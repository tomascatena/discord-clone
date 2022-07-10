import { RoomContainer } from './Room.styled';
import React from 'react';

type Props = {}

const Room:React.FC<Props> = () => {
  const [isRoomMinimized, setIsRoomMinimized] = React.useState(true);

  const roomResizeHandler = () => { // eslint-disable-line
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <RoomContainer isMinimized={isRoomMinimized}>
      Room
    </RoomContainer>
  );
};

export default Room;
