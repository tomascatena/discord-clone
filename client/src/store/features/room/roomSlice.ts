import { RoomDetails } from '@/typings/typings';
import { createSlice } from '@reduxjs/toolkit';

export interface RoomState {
  isUserInRoom: boolean;
  isUserRoomCreator: boolean;
  roomDetails: RoomDetails | null;
  activeRooms: string[];
  localStream: MediaStream | null;
  remoteStreams: MediaStream[] | null;
  audioOnly: boolean;
  screenSharingStream: MediaStream | null;
  isScreenSharingActive: boolean;
}

export const initialState: RoomState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: null,
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setOpenRoom: (state, action) => {
      state.isUserInRoom = action.payload.isUserInRoom;
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
    },
    setRoomDetails: (state, action) => {
      state.roomDetails = action.payload;
    },
    setActiveRooms: (state, action) => {
      state.activeRooms = action.payload;
    },
    setLocalStream: (state, action) => {
      state.localStream = action.payload;
    },
    setRemoteStreams: (state, action) => {
      state.remoteStreams = action.payload;
    },
    setAudioOnly: (state, action) => {
      state.audioOnly = action.payload;
    },
    setScreenSharingStream: (state, action) => {
      state.screenSharingStream = action.payload;
    },
    setScreenSharingActive: (state, action) => {
      state.isScreenSharingActive = action.payload;
    },
  },
  extraReducers: () => { },
});

export const roomActions = roomSlice.actions;

export default roomSlice.reducer;
