import { IconButton } from '@mui/material';
import { RoomButtonsContainer } from './RoomButtons.styled';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CloseIcon from '@mui/icons-material/Close';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

type Props = {}

const RoomButtons:React.FC<Props> = () => {
  const [cameraEnabled, setCameraEnabled] = React.useState(true);
  const [micEnabled, setMicEnabled] = React.useState(true);
  const [isSharingScreen, setIsSharingScreen] = React.useState(false);

  return (
    <RoomButtonsContainer>
      <IconButton onClick={() => setIsSharingScreen(!isSharingScreen)}>
        {isSharingScreen ? <CancelPresentationIcon /> : <PresentToAllIcon/>}
      </IconButton>

      <IconButton onClick={() => setMicEnabled(!micEnabled)}>
        {micEnabled ? <MicIcon /> : <MicOffIcon/>}
      </IconButton>

      <IconButton>
        <CloseIcon />
      </IconButton>

      <IconButton onClick={() => setCameraEnabled(!cameraEnabled)}>
        {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon/>}
      </IconButton>
    </RoomButtonsContainer>
  );
};

export default RoomButtons;
