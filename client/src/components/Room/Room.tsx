import { RoomContainer } from './Room.styled';
import React from 'react';
import ResizeRoomButton from './ResizeRoomButton/ResizeRoomButton';
import RoomButtons from './RoomButtons/RoomButtons';
import VideosContainer from './VideosContainer/VideosContainer';

const Room:React.FC = () => {
  const [isRoomMinimized, setIsRoomMinimized] = React.useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimized(!isRoomMinimized);
  };

  return (
    <RoomContainer isMinimized={isRoomMinimized}>
      <VideosContainer/>

      <RoomButtons/>

      <ResizeRoomButton
        isRoomMinimized={isRoomMinimized}
        handleRoomResize={roomResizeHandler}
      />
    </RoomContainer>
  );
};

export default Room;
