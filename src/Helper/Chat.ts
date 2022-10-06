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

export const getAvatarMessage = (
  conversation: IConversation,
  user: IUser
): (string | undefined)[] => {
  return conversation.participants
    .filter((item) => item.user._id !== user._id)
    .slice(0, 2)
    .map((i) => i.user.avatar);
};

export const getLastMessage = (conversation: IConversation): string => {
  return conversation.messages[0].content;
};

export const getNickNameOrName = (conversation: IConversation, user: IUser): string => {
  const participant = conversation.participants.find((i) => i.user._id === user._id);
  return participant?.nickName ?? user.fullName;
};
