import { IFile } from "./article";
import IUser from "./user";

export interface IConversation {
  createdAt: string;
  updatedAt: string;
  type: "PRIVATE" | "GROUP",
  host: IUser,
  paticipants: {
    user: IUser,
    nickName: string;
    lastSeen?: string;
    lastDelete?: string;
  }[],
  name: string;
  pinMessage: IMessage;
  messages?: IMessage[];
}

export interface IMessage {
  createdAt: string;
  updatedAt: string;
  content: string;
  files: IFile[];
  reply: IMessage;
  conversationId: string;
}
