export const StartListeners = (message: { type: string; message: string; timestamp: number }[]) => {
  const lastMessage = message[message?.length - 1];

  if (lastMessage && lastMessage?.type === 'participant_join') alert(lastMessage.message);
};
