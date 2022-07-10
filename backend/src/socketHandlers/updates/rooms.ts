import serverStore from '@/serverStore';

const updateRooms = (toSpecifiedTargetId: string | null = null) => {
  const io = serverStore.getSocketServerInstance();
  const activeRooms = serverStore.getActiveRooms();

  if (toSpecifiedTargetId) {
    io.to(toSpecifiedTargetId).emit('active-rooms', {
      activeRooms,
    });
  } else {
    io.emit('active-rooms', {
      activeRooms,
    });
  }
};

export default {
  updateRooms,
};
