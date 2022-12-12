import { IFile } from './article';
import IUser from './user';

export interface IConversation {
  _id: string;
  createdAt: string;
  updatedAt: string;
  type: 'PRIVATE' | 'GROUP';
  host: IUser;
  participants: IParticipant[];
  name: string;
  pinMessage: IMessage;
  messages: IMessage[];
  totalMessage: 0;
  isLoadMore: boolean;
}

export enum TypeActiveMessage {
  ACTIVE,
  MINIMIZE,
}

interface IParticipant {
  user: IUser;
  nickName: string;
  lastSeen?: string;
  lastDelete?: string;
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
  deletedAt: string | null;
}

export enum TypeMessage {
  MESSAGE = 'MESSAGE',
  // IMAGE = 'IMAGE',
  // VIDEO = 'VIDEO',
  NOTIFICATION = 'NOTIFICATION',
}

export enum IStatusMessage {
  LOADING,
}

export interface ICall {
  _id: string;
  createdAt: string;
  endAt: string;
  conversation: IConversation;
  createdBy: IUser;
  participants: [IParticipantCall];
}

interface IParticipantCall {
  user: IUser;
  signal: any;
}
