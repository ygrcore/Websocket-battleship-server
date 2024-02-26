export const handleCreateRoom = (roomId: number, name: string, index: number) => {
  const roomData = {
    roomId: roomId,
    roomUsers: [
      {
        name: name,
        index: index,
      },
    ],
  };

  const response = {
    type: "update_room",
    data: JSON.stringify(roomData),
    id: 0,
  };
  return JSON.stringify(response);
};
