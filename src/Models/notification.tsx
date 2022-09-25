import IArticle, { IComment } from './article';
import { IFriend } from './friend';

export interface INotificationReducer {
  notifications: INotification[];
  requesting: boolean;
  totalUnseen: number;
}

export interface INotification {
  _id: string;
  type: 'LIKE_POST' | 'LIKE_COMMENT' | 'REPLY_COMMENT' | 'COMMENT_POST' | 'ACCREP_FRIEND';
  post?: IArticle;
  comment?: IComment;
  friend?: IFriend;
  updatedAt: string;
  createdAt: string;
}
