import IUser from './user';
export default interface IArticle {
  text: string;
  images: IFile[];
  _id: string;
  createAt: Date;
  createBy: IUser;
  liked: [];
  action?: string;
  comment: IComment[];
}

export interface IComment {
  content: string;
  file: IFile[];
  liked: ILike[];
  createdBy: IUser;
  createdAt: string;
  replyTo?: string;
}

export interface ILike {}
export interface IFile {
  url: string;
}
