import { IConversation } from '../Models/chat';
import IUser from '../Models/user';

export const getNameMessage = (conversation: IConversation, user: IUser): string => {
  if (conversation.name) {
    return conversation.name;
  }
  return conversation.participants
    .filter((item) => item.user._id !== user._id)
    .map((i) => i.nickName || i.user.fullName)
    .join(', ');
};
