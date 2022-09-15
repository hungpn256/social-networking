import { IFile } from './article';
import IUser from './user';

export interface IConversation {
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: 'PRIVATE' | 'GROUP';
  host: IUser;
  participants: {
    user: IUser;
    nickName: string;
    lastSeen?: string;
    lastDelete?: string;
  }[];
  name: string;
  pinMessage: IMessage;
  messages: IMessage[];
  totalMessage: 0;
  isLoadMore: boolean;
}

export enum TypeActiveMessage {
  ACTIVE,
  MINIMIZE
}

export interface IMessage {
  _id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  files: IFile[];
  reply: IMessage;
  conversationId: string;
  createdBy: IUser;
  type: TypeMessage;
  status?: IStatusMessage;
}

export enum TypeMessage {
  TEXT,
  IMAGE,
  VIDEO
}

export enum IStatusMessage {
  LOADING
}
