import { IconButton } from '@mui/material';
import { ResizeRoomButtonContainer } from './ResizeRoomButton.styled';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import React from 'react';

type Props = {
  isRoomMinimized: boolean;
  handleRoomResize: () => void;
}

const ResizeRoomButton:React.FC<Props> = ({ isRoomMinimized, handleRoomResize }) => {
  return (
    <ResizeRoomButtonContainer>
      <IconButton onClick={handleRoomResize}>
        {isRoomMinimized ? <FullscreenIcon /> : <FullscreenExitIcon/>}
      </IconButton>
    </ResizeRoomButtonContainer>
  );
};

export default ResizeRoomButton;
