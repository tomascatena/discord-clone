import { RoomDetails } from '@/typings/typings';
import { emitRoomCreate } from './socketConnection';
import { roomActions } from '@/store/features/room/roomSlice';
import { store } from '@/store/store';

type CreateNewRoomParams = {
  isUserInRoom?: boolean;
  isUserRoomCreator?: boolean;
}

const defaultCreateNewRoomParams = {
  isUserInRoom: true,
  isUserRoomCreator: true,
};

const createNewRoom = (data :CreateNewRoomParams = defaultCreateNewRoomParams) => {
  store.dispatch(roomActions.setOpenRoom(data));

  emitRoomCreate();
};

const newRoomCreated = (roomDetails: RoomDetails) => {
  store.dispatch(roomActions.setRoomDetails(roomDetails));
};

export default {
  createNewRoom,
  newRoomCreated
};
