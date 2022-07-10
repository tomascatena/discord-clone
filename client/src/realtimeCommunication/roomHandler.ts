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

/**
 * @desc Set in the store that the user is in a room and is the creator. Emit the room-create event to the server.
 */
const createNewRoom = (data :CreateNewRoomParams = defaultCreateNewRoomParams) => {
  store.dispatch(roomActions.setOpenRoom(data));

  emitRoomCreate();
};

/**
 * @desc Set in the store the room details of the newly created room.
 * @param roomDetails - room details
 */
const newRoomCreated = (roomDetails: RoomDetails) => {
  store.dispatch(roomActions.setRoomDetails(roomDetails));
};

export const updateActiveRooms = (activeRooms: RoomDetails[]) => {
  store.dispatch(roomActions.setActiveRooms(activeRooms));
};

export default {
  createNewRoom,
  newRoomCreated,
  updateActiveRooms
};
