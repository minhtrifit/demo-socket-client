// Listen event to socket
export const StartListeners = (socket: any) => {
  socket.on('participant_join', (res: any) => {
    console.log('📢 Participant joined:', res);

    if (res?.message) alert(res?.message);
  });
};
