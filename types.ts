export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type MessageType = {
  id: string;
  text: string;
  createdAt: string;
  senderAt: string;
  receiverId: string;
  sender: User;
  receiver: User;
};
