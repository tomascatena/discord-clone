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
};

export default {
  createNewRoom,
};
