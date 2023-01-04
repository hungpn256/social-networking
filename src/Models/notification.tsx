import IArticle, { IComment } from './article';
import { IFriend } from './friend';

export interface INotificationReducer {
  notifications: INotification[];
  requesting: boolean;
  totalUnseen: number;
}

export interface INotification {
  _id: string;
  type: 'LIKE_POST' | 'LIKE_COMMENT' | 'REPLY_COMMENT' | 'COMMENT_POST' | 'FRIEND';
  post?: IArticle;
  comment?: {
    replyTo: IComment;
    newComment: IComment;
  };
  friend?: IFriend;
  updatedAt: string;
  createdAt: string;
  isSeen: boolean;
}
